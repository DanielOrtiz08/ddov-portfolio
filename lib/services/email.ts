import { ContactFormData } from '@/lib/types/contact';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@resend.dev';
const OWNER_EMAIL = process.env.RESEND_OWNER_EMAIL || 'ddov0811@gmail.com';

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmailNotification(
  data: ContactFormData
): Promise<EmailResponse> {
  try {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY no está configurada');
    }

    const emailContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      h1 {
        color: #000;
        border-bottom: 2px solid #3b82f6;
        padding-bottom: 10px;
      }
      .field {
        margin: 20px 0;
      }
      .label {
        font-weight: 600;
        color: #3b82f6;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .value {
        margin-top: 5px;
        color: #333;
        font-size: 16px;
      }
      .message-box {
        background: #f9fafb;
        padding: 15px;
        border-left: 4px solid #3b82f6;
        border-radius: 4px;
      }
      .footer {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        font-size: 12px;
        color: #6b7280;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📨 Nuevo mensaje desde tu portafolio</h1>
      
      <div class="field">
        <div class="label">Nombre</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <div class="label">Correo</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>

      <div class="field">
        <div class="label">Asunto</div>
        <div class="value">${escapeHtml(data.subject)}</div>
      </div>

      <div class="field">
        <div class="label">Mensaje</div>
        <div class="message-box">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
      </div>

      <div class="footer">
        <p>Este mensaje fue enviado desde el formulario de contacto de tu portafolio.</p>
      </div>
    </div>
  </body>
</html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `📧 ${data.subject}`,
        html: emailContent,
        replyTo: data.email,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error de Resend: ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    return {
      success: true,
      messageId: result.id,
    };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al enviar email',
    };
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
