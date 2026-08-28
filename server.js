const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Vercel (y otros hosts serverless) están detrás de un proxy; sin esto,
// express-rate-limit no puede identificar la IP real del visitante.
app.set('trust proxy', 1);

// Headers de seguridad básicos (X-Content-Type-Options, X-Frame-Options, etc.)
app.use(helmet({
  contentSecurityPolicy: false // el sitio carga Tailwind/Google Fonts desde CDNs externos
}));

// Middleware — límite de tamaño de body chico: ni el chat ni el form de contacto lo necesitan grande
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting para el asistente IA: evita abuso de la cuota de la API de Gemini
const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: (req) => ({
    error: normalizeLang(req.body && req.body.lang) === 'en'
      ? 'Too many requests. Please try again in a few minutes.'
      : 'Demasiadas consultas. Probá de nuevo en unos minutos.'
  })
});

// Datos del portafolio — fuente única compartida con el frontend (public/js/data.js)
const { PORTFOLIO_DATA } = require('./public/js/data.js');

function normalizeLang(lang) {
  return lang === 'en' ? 'en' : 'es';
}

// Sistema de prompt para el asistente IA (uno por idioma)
function buildSystemInstruction(lang) {
  const data = PORTFOLIO_DATA[lang];

  if (lang === 'en') {
    return `
You are the virtual assistant for Agustin Elisey Larco's portfolio.
Your mission is to answer questions about his professional profile clearly, professionally and CONCISELY.

CONTEXT:
- Candidate: ${data.name}
- Current role: ${data.title}
- Profile: ${data.about}
- Experience: ${JSON.stringify(data.experience)}
- Education: ${JSON.stringify(data.education)}
- Certifications: ${JSON.stringify(data.certifications)}
- Projects: ${JSON.stringify(data.projects)}
- Skills: ${data.skills.map(s => s.name).join(", ")}

RESPONSE RULES (CRITICAL):
1. BREVITY: Always answer briefly and directly. No long introductions.
2. NO REPETITION: Don't repeat data you already mentioned or that's obvious. Avoid redundancy.
3. LIMIT: Keep answers to a maximum of 2-3 sentences or key points, unless asked for a detailed list.
4. LANGUAGE: Always respond in English.
5. TONE: Professional, approachable and direct.
6. If the user asks something unrelated to the professional profile, briefly reply that you're here to help with career, education and project questions.
7. FORMAT: No Markdown (no **bold**, asterisks, or dash lists). The response is shown as plain text.
`;
  }

  return `
Sos el asistente virtual del portfolio de Agustin Elisey Larco.
Tu misión es responder preguntas sobre su perfil profesional de forma clara, profesional y CONCISA.

CONTEXTO:
- Candidato: ${data.name}
- Rol actual: ${data.title}
- Perfil: ${data.about}
- Experiencia: ${JSON.stringify(data.experience)}
- Educación: ${JSON.stringify(data.education)}
- Certificaciones: ${JSON.stringify(data.certifications)}
- Proyectos: ${JSON.stringify(data.projects)}
- Aptitudes: ${data.skills.map(s => s.name).join(", ")}

REGLAS DE RESPUESTA (CRÍTICAS):
1. BREVEDAD: Responde siempre de forma corta y directa. No uses introducciones largas.
2. NO REPETICIÓN: No repitas datos que ya mencionaste o que son obvios. Evita la redundancia.
3. LÍMITE: Mantené tus respuestas en un máximo de 2-3 frases o puntos clave, a menos que te pidan una lista detallada.
4. IDIOMA: Respondé siempre en Español.
5. TONO: Profesional, cercano y directo.
6. Si el usuario pregunta algo fuera de lo profesional, respondé brevemente que estás para ayudar con consultas de carrera, formación y proyectos.
7. FORMATO: No uses Markdown (nada de **negritas**, asteriscos, ni listas con guiones). La respuesta se muestra como texto plano.
`;
}

// Inicializar Gemini AI (si hay API key) — un modelo por idioma
const geminiModels = { es: null, en: null };

async function initGemini() {
  if (process.env.GEMINI_API_KEY) {
    try {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      geminiModels.es = genAI.getGenerativeModel({
        model: 'gemini-3.6-flash',
        systemInstruction: buildSystemInstruction('es')
      });
      geminiModels.en = genAI.getGenerativeModel({
        model: 'gemini-3.6-flash',
        systemInstruction: buildSystemInstruction('en')
      });
      console.log('✅ Gemini AI inicializado correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar Gemini:', error.message);
      geminiModels.es = null;
      geminiModels.en = null;
    }
  } else {
    console.log('⚠️  GEMINI_API_KEY no encontrada. Usando respuestas simuladas.');
  }
}

// Función fallback con respuestas simuladas (una por idioma)
function generateFallbackResponse(userMessage, lang) {
  const data = PORTFOLIO_DATA[lang];
  const message = userMessage.toLowerCase();

  if (lang === 'en') {
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return `I currently work as ${data.experience[0].role} at ${data.experience[0].company} since ${data.experience[0].period}. My main skills include: ${data.experience[0].skills.slice(0, 3).join(', ')}.`;
    }
    if (message.includes('education') || message.includes('degree') || message.includes('universit')) {
      return `I have a Bachelor's Degree in Computer Science and a Technical Degree in Web Technologies, both from Universidad Nacional del Oeste.`;
    }
    if (message.includes('certif')) {
      const list = data.certifications.map(c => `${c.title} (${c.issuer})`).join(', ');
      return `I hold these certifications: ${list}.`;
    }
    if (message.includes('skill') || message.includes('technolog')) {
      return `My main technical skills are: ${data.skills.slice(0, 6).map(s => s.name).join(', ')}. Specialized in data analysis and QA.`;
    }
    if (message.includes('project')) {
      return `I've worked on projects like ${data.projects.map(p => p.name).join(', ')}. You can see the details of each one in the Projects section.`;
    }
    if (message.includes('sql') || message.includes('database')) {
      return `I use SQL for data validation, analysis and detecting inconsistencies in production environments.`;
    }
    if (message.includes('qa') || message.includes('testing') || message.includes('quality')) {
      return `My QA experience includes: manual testing, automation, test cases, and working with JIRA in agile environments.`;
    }
    if (message.includes('contact') || message.includes('email') || message.includes('linkedin')) {
      return `You can reach me through LinkedIn or check the contact section at the bottom of the portfolio.`;
    }
    if (message.includes('hi') || message.includes('hello')) {
      return `Hi! I'm here to answer questions about Agustín's experience, skills and education. What would you like to know?`;
    }
    return `I can help with info about: work experience, education, certifications, projects, technical skills, SQL, QA/Testing. What are you interested in?`;
  }

  if (message.includes('experiencia') || message.includes('trabajo')) {
    return `Actualmente trabajo como ${data.experience[0].role} en ${data.experience[0].company} desde ${data.experience[0].period}. Mis principales habilidades incluyen: ${data.experience[0].skills.slice(0, 3).join(', ')}.`;
  }

  if (message.includes('educación') || message.includes('estudios') || message.includes('universidad')) {
    return `Tengo una Licenciatura en Informática y una Tecnicatura en Tecnologías Web, ambas de la Universidad Nacional del Oeste.`;
  }

  if (message.includes('certificación') || message.includes('certificado')) {
    const list = data.certifications.map(c => `${c.title} (${c.issuer})`).join(', ');
    return `Cuento con estas certificaciones: ${list}.`;
  }

  if (message.includes('skills') || message.includes('habilidades') || message.includes('tecnologías')) {
    return `Mis principales skills técnicas son: ${data.skills.slice(0, 6).map(s => s.name).join(', ')}. Especializado en análisis de datos y QA.`;
  }

  if (message.includes('proyecto')) {
    return `Trabajé en proyectos como ${data.projects.map(p => p.name).join(', ')}. Podés ver el detalle de cada uno en la sección de Proyectos.`;
  }

  if (message.includes('sql') || message.includes('base de datos')) {
    return `Utilizo SQL para validación de datos, análisis y detección de inconsistencias en entornos de producción.`;
  }

  if (message.includes('qa') || message.includes('testing') || message.includes('calidad')) {
    return `Mi experiencia en QA incluye: testing manual, automatización, casos de prueba, y trabajo con JIRA en entornos ágiles.`;
  }

  if (message.includes('contacto') || message.includes('email') || message.includes('linkedin')) {
    return `Puedes contactarme a través de LinkedIn o consultar la sección de contacto al final del portafolio.`;
  }

  if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes')) {
    return `¡Hola! Estoy aquí para responder preguntas sobre la experiencia, habilidades y formación de Agustín. ¿Qué te gustaría saber?`;
  }

  return `Puedo ayudarte con información sobre: experiencia laboral, educación, certificaciones, proyectos, skills técnicas, SQL, QA/Testing. ¿Qué te interesa saber?`;
}

const MAX_MESSAGE_LENGTH = 500;

// Ruta API para el chatbot
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, lang: rawLang } = req.body;
    const lang = normalizeLang(rawLang);

    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: lang === 'en' ? 'Message required' : 'Mensaje requerido' });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: lang === 'en'
          ? `Message too long (max ${MAX_MESSAGE_LENGTH} characters)`
          : `Mensaje demasiado largo (máx. ${MAX_MESSAGE_LENGTH} caracteres)`
      });
    }

    const model = geminiModels[lang];

    // Usar Gemini AI si está disponible
    if (model) {
      try {
        const result = await model.generateContent(message);
        const response = result.response.text();
        return res.json({ response });
      } catch (aiError) {
        console.error('Error en Gemini API:', aiError.message);
        // Fallback a respuestas simuladas si Gemini falla
        const response = generateFallbackResponse(message, lang);
        return res.json({ response });
      }
    }

    // Fallback: respuestas simuladas si no hay API key
    const response = generateFallbackResponse(message, lang);
    res.json({ response });

  } catch (error) {
    console.error('Error en /api/chat:', error);
    res.status(500).json({
      error: 'Error al procesar la solicitud',
      response: 'Lo siento, hubo un error al procesar tu pregunta. Por favor intenta nuevamente.'
    });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener datos del portafolio (API)
app.get('/api/portfolio', (req, res) => {
  const lang = normalizeLang(req.query.lang);
  res.json(PORTFOLIO_DATA[lang]);
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar servidor
async function startServer() {
  await initGemini();

  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, 'public')}`);
    if (!geminiModels.es) {
      console.log(`\n💡 Para usar Gemini AI, configura GEMINI_API_KEY en el archivo .env`);
    }
    console.log('');
  });
}

startServer();
