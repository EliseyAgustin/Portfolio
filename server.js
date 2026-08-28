const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Datos del portafolio — fuente única compartida con el frontend (public/js/data.js)
const PORTFOLIO_DATA = require('./public/js/data.js');

// Sistema de prompt para el asistente IA
const SYSTEM_INSTRUCTION = `
Sos el asistente virtual del portfolio de Agustin Elisey Larco.
Tu misión es responder preguntas sobre su perfil profesional de forma clara, profesional y CONCISA.

CONTEXTO:
- Candidato: ${PORTFOLIO_DATA.name}
- Rol actual: ${PORTFOLIO_DATA.title}
- Perfil: ${PORTFOLIO_DATA.about}
- Experiencia: ${JSON.stringify(PORTFOLIO_DATA.experience)}
- Educación: ${JSON.stringify(PORTFOLIO_DATA.education)}
- Certificaciones: ${JSON.stringify(PORTFOLIO_DATA.certifications)}
- Proyectos: ${JSON.stringify(PORTFOLIO_DATA.projects)}
- Aptitudes: ${PORTFOLIO_DATA.skills.map(s => s.name).join(", ")}

REGLAS DE RESPUESTA (CRÍTICAS):
1. BREVEDAD: Responde siempre de forma corta y directa. No uses introducciones largas.
2. NO REPETICIÓN: No repitas datos que ya mencionaste o que son obvios. Evita la redundancia.
3. LÍMITE: Mantené tus respuestas en un máximo de 2-3 frases o puntos clave, a menos que te pidan una lista detallada.
4. IDIOMA: Respondé siempre en Español.
5. TONO: Profesional, cercano y directo.
6. Si el usuario pregunta algo fuera de lo profesional, respondé brevemente que estás para ayudar con consultas de carrera, formación y proyectos.
7. FORMATO: No uses Markdown (nada de **negritas**, asteriscos, ni listas con guiones). La respuesta se muestra como texto plano.
`;

// Inicializar Gemini AI (si hay API key)
let geminiModel = null;

async function initGemini() {
  if (process.env.GEMINI_API_KEY) {
    try {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      geminiModel = genAI.getGenerativeModel({ 
        model: 'gemini-3.6-flash',
        systemInstruction: SYSTEM_INSTRUCTION
      });
      console.log('✅ Gemini AI inicializado correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar Gemini:', error.message);
      geminiModel = null;
    }
  } else {
    console.log('⚠️  GEMINI_API_KEY no encontrada. Usando respuestas simuladas.');
  }
}

// Función fallback con respuestas simuladas
function generateFallbackResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  if (message.includes('experiencia') || message.includes('trabajo')) {
    return `Actualmente trabajo como ${PORTFOLIO_DATA.experience[0].role} en ${PORTFOLIO_DATA.experience[0].company} desde ${PORTFOLIO_DATA.experience[0].period}. Mis principales habilidades incluyen: ${PORTFOLIO_DATA.experience[0].skills.slice(0, 3).join(', ')}.`;
  }
  
  if (message.includes('educación') || message.includes('estudios') || message.includes('universidad')) {
    return `Tengo una Licenciatura en Informática y una Tecnicatura en Tecnologías Web, ambas de la Universidad Nacional del Oeste.`;
  }
  
  if (message.includes('certificación') || message.includes('certificado')) {
    const list = PORTFOLIO_DATA.certifications.map(c => `${c.title} (${c.issuer})`).join(', ');
    return `Cuento con estas certificaciones: ${list}.`;
  }
  
  if (message.includes('skills') || message.includes('habilidades') || message.includes('tecnologías')) {
    return `Mis principales skills técnicas son: ${PORTFOLIO_DATA.skills.slice(0, 6).map(s => s.name).join(', ')}. Especializado en análisis de datos y QA.`;
  }

  if (message.includes('proyecto')) {
    return `Trabajé en proyectos como ${PORTFOLIO_DATA.projects.map(p => p.name).join(', ')}. Podés ver el detalle de cada uno en la sección de Proyectos.`;
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

// Ruta API para el chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }
    
    // Usar Gemini AI si está disponible
    if (geminiModel) {
      try {
        const result = await geminiModel.generateContent(message);
        const response = result.response.text();
        return res.json({ response });
      } catch (aiError) {
        console.error('Error en Gemini API:', aiError.message);
        // Fallback a respuestas simuladas si Gemini falla
        const response = generateFallbackResponse(message);
        return res.json({ response });
      }
    }
    
    // Fallback: respuestas simuladas si no hay API key
    const response = generateFallbackResponse(message);
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
  res.json(PORTFOLIO_DATA);
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
    if (!geminiModel) {
      console.log(`\n💡 Para usar Gemini AI, configura GEMINI_API_KEY en el archivo .env`);
    }
    console.log('');
  });
}

startServer();