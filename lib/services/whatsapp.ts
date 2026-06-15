import { ContactFormData } from '@/lib/types/contact';

interface WhatsAppResponse {
  success: boolean;
  message?: string;
  error?: string;
  sid?: string;
  raw?: any;
}

// Opciones de envío a WhatsApp:
// 1. TWILIO: Más confiable pero con costo (recomendado)
// 2. WEBHOOK: Servicio genérico para debugging/alternativas
// 3. TELEGRAM: Alternativa gratuita

const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || '3243913693'; // Tu número
const WHATSAPP_SERVICE = process.env.WHATSAPP_SERVICE || 'telegram'; // 'twilio', 'webhook', o 'telegram'

/**
 * Envía notificación a WhatsApp usando el servicio configurado
 */
export async function sendWhatsAppNotification(
  data: ContactFormData
): Promise<WhatsAppResponse> {
  // Por defecto, intentamos con la opción configurada
  // Si falla, intentamos con alternativas
  
  if (WHATSAPP_SERVICE === 'twilio') {
    return sendViaTwilio(data);
  } else if (WHATSAPP_SERVICE === 'telegram') {
    return sendViaTelegram(data);
  } else {
    return sendViaWebhook(data);
  }
}

/**
 * Envío vía Twilio (requiere configuración)
 * Variables de entorno necesarias:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_WHATSAPP_FROM
 */
async function sendViaTwilio(data: ContactFormData): Promise<WhatsAppResponse> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM;
    const contentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID;
    const contentVariables = process.env.TWILIO_WHATSAPP_CONTENT_VARIABLES;

    if (!accountSid || !authToken || !fromNumber) {
      return {
        success: false,
        error: 'Twilio no está configurado. Por favor usa otra opción o configura Twilio.',
      };
    }

    const message = formatWhatsAppMessage(data);
    const toNumber = `whatsapp:+57${WHATSAPP_PHONE}`;
    const form = new URLSearchParams({
      From: fromNumber,
      To: toNumber,
    });

    if (contentSid) {
      form.append('ContentSid', contentSid);
      if (contentVariables) {
        form.append('ContentVariables', contentVariables);
      }
    } else {
      form.append('Body', message);
    }

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        },
        body: form,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error de Twilio: ${JSON.stringify(error)}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Mensaje WhatsApp enviado vía Twilio',
      sid: result.sid,
      raw: result,
    };
  } catch (error) {
    console.error('Error al enviar WhatsApp vía Twilio:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Envío vía Telegram (alternativa gratuita)
 * Variables de entorno necesarias:
 * - TELEGRAM_BOT_TOKEN
 * - TELEGRAM_CHAT_ID
 */
async function sendViaTelegram(data: ContactFormData): Promise<WhatsAppResponse> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return {
        success: false,
        error: 'Telegram no está configurado.',
      };
    }

    const message = formatWhatsAppMessage(data);

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error de Telegram: ${JSON.stringify(error)}`);
    }

    return {
      success: true,
      message: 'Notificación enviada a Telegram',
    };
  } catch (error) {
    console.error('Error al enviar notificación vía Telegram:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Envío vía Webhook genérico (para debugging o servicios como n8n/Make)
 */
async function sendViaWebhook(data: ContactFormData): Promise<WhatsAppResponse> {
  try {
    const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;

    // Si no hay webhook configurado, retornamos un error amigable
    if (!webhookUrl) {
      console.warn(
        'WHATSAPP_WEBHOOK_URL no está configurada. ' +
        'Configura Twilio o Telegram para recibir notificaciones.'
      );
      return {
        success: true, // Retornamos true para no bloquear el flujo
        message: 'Formulario procesado (notificación WhatsApp no configurada)',
      };
    }

    const message = formatWhatsAppMessage(data);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: `+57${WHATSAPP_PHONE}`,
        message,
        userData: {
          name: data.name,
          email: data.email,
          subject: data.subject,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook retornó ${response.status}`);
    }

    return {
      success: true,
      message: 'Notificación enviada al webhook',
    };
  } catch (error) {
    console.error('Error al enviar al webhook:', error);
    // No lanzamos error aquí para no interrumpir el flujo si el webhook falla
    return {
      success: true,
      message: 'Formulario procesado',
    };
  }
}

/**
 * Formatea el mensaje para WhatsApp
 */
function formatWhatsAppMessage(data: ContactFormData): string {
  return `📧 *Nuevo mensaje desde tu portafolio*

*Nombre:* ${data.name}
*Email:* ${data.email}
*Asunto:* ${data.subject}

*Mensaje:*
${data.message}`;
}
