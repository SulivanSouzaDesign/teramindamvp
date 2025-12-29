
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a suggested response for the therapist using Gemini 3 Flash.
 * Re-instantiates GoogleGenAI inside the function to ensure the correct API key is used.
 */
export const generateTherapistResponse = async (
  clientMessage: string, 
  tone: 'warm' | 'professional' | 'concise' = 'warm'
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Você é um assistente de IA para terapeutas usando o TeraMind.
      O objetivo é ajudar o terapeuta a responder mensagens de pacientes.
      
      Mensagem do paciente: "${clientMessage}"
      
      Instrução: Escreva uma sugestão de resposta curta, acolhedora e profissional em português.
      Tom desejado: ${tone}.
      Não use jargões médicos complexos. Mantenha a humanidade e empatia.
      Responda APENAS com a sugestão de texto, sem comentários adicionais.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
    });

    if (!response.text) {
      throw new Error("Resposta vazia da IA");
    }

    return response.text.trim();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Desculpe, tive um problema ao gerar uma sugestão. Você pode tentar novamente?";
  }
};

/**
 * Summarizes session notes for the medical record.
 */
export const summarizeSessionNotes = async (notes: string): Promise<string> => {
   try {
     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
     const response = await ai.models.generateContent({
       model: 'gemini-3-flash-preview',
       contents: [{ parts: [{ text: `Resuma os seguintes pontos principais desta sessão terapêutica para o prontuário, mantendo confidencialidade e brevidade: ${notes}` }] }],
     });
     return response.text?.trim() || "Sem resumo disponível.";
   } catch (error) {
     console.error("Error summarizing:", error);
     return "Não foi possível resumir as notas no momento.";
   }
};
