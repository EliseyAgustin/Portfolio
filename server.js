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

// Importar datos del portafolio
const PORTFOLIO_DATA = {
  name: "Agustin Elisey Larco",
  title: "Data Analyst | QA Tester",
  location: "Buenos Aires, Provincia de Buenos Aires, Argentina",
  about: `Como ex Analista de Datos en Shalion, apliqué mis habilidades en capacidad de análisis, Quality Assurance y Testing. Mi experiencia incluye el uso de SQL para validación de datos, documentación de procesos y la identificación y reporte de inconsistencias en datos, todo dentro de entornos ágiles colaborativos.`,
  experience: [
    {
      company: "Shalion",
      role: "Analista de Datos",
      period: "may. 2024 - feb. 2026",
      skills: ["Hojas de cálculo de Google", "SQL", "Análisis de Datos", "Quality Assurance"]
    }
  ],
  education: [
    {
      institution: "Universidad Nacional del Oeste",
      degree: "Tecnicatura Universitaria en Tecnologías Web",
      date: "mar. 2023"
    },
    {
      institution: "Universidad Nacional del Oeste",
      degree: "Licenciatura en Informática",
      date: "mar. 2020"
    }
  ],
  certifications: [
    {
      title: "QA Engineer desde 0 hasta avanzado",
      issuer: "Udemy",
      date: "jun. 2025",
      skills: ["JIRA", "Casos de prueba", "Metodologías Ágiles", "Testing Automation"]
    }
  ],
  skills: ["SQL", "JIRA", "Resolución de incidencias", "Casos de prueba", "Trabajo en equipo", "Google Sheets", "Agile/Scrum", "Testing Manual", "Documentación"]
};

// Sistema de prompt para el asistente IA
const SYSTEM_INSTRUCTION = `
Eres el núcleo de inteligencia (Kernel) del portafolio de Agustin Elisey Larco. 
Tu misión es proporcionar información técnica y profesional sobre su carrera como Analista de Datos y QA Engineer de forma extremadamente CONCISA.

CONTEXTO DEL SISTEMA:
- Candidato: ${PORTFOLIO_DATA.name}
- Rol actual: ${PORTFOLIO_DATA.title}
- Especialidades: SQL, QA Automation, Testing Manual, Documentación Ágil
- Perfil: ${PORTFOLIO_DATA.about}
- Experiencia: ${JSON.stringify(PORTFOLIO_DATA.experience)}
- Educación: ${JSON.stringify(PORTFOLIO_DATA.education)}
- Certificaciones: ${JSON.stringify(PORTFOLIO_DATA.certifications)}
- Aptitudes: ${PORTFOLIO_DATA.skills.join(", ")}

REGLAS DE RESPUESTA (CRÍTICAS):
1. BREVEDAD: Responde siempre de forma corta y directa. No uses introducciones largas.
2. NO REPETICIÓN: No repitas datos que ya mencionaste o que son obvios. Evita la redundancia.
3. LÍMITE: Mantén tus respuestas en un máximo de 2-3 frases o puntos clave, a menos que te pidan una lista detallada.
4. IDIOMA: Responde siempre en Español.
5. TONO: Profesional, técnico y directo (estilo terminal).
6. Si el usuario pregunta algo fuera de lo profesional, responde brevemente que el sistema está optimizado para consultas de carrera y formación.
`;

// Inicializar Gemini AI (si hay API key)
let geminiModel = null;

async function initGemini() {
  if (process.env.GEMINI_API_KEY) {
    try {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      geminiModel = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
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
    return `Estoy certificado como QA Engineer (Udemy, 2025) con conocimientos en: ${PORTFOLIO_DATA.certifications[0].skills.join(', ')}.`;
  }
  
  if (message.includes('skills') || message.includes('habilidades') || message.includes('tecnologías')) {
    return `Mis principales skills técnicas son: ${PORTFOLIO_DATA.skills.slice(0, 6).join(', ')}. Especializado en análisis de datos y QA.`;
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
  
  return `Puedo ayudarte con información sobre: experiencia laboral, educación, certificaciones, skills técnicas, SQL, QA/Testing. ¿Qué te interesa saber?`;
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