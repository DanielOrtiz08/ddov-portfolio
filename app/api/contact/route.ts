import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData, SendContactResponse } from '@/lib/types/contact';
import { validateContactForm, isFormValid } from '@/lib/validation/contact';
import { validateAntiSpam } from '@/lib/validation/antispam';
import { sendEmailNotification } from '@/lib/services/email';
import { sendWhatsAppNotification } from '@/lib/services/whatsapp';

export async function POST(request: NextRequest): Promise<NextResponse<SendContactResponse>> {
  try {
    // Validar que sea POST
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Método no permitido' },
        { status: 405 }
      );
    }

    // Parsear el body
    const body: unknown = await request.json();
    const data = body as ContactFormData;

    // Validar datos
    const errors = validateContactForm(data);
    if (!isFormValid(errors)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validación fallida',
          error: JSON.stringify(errors),
        },
        { status: 400 }
      );
    }

    // Anti-spam: bloquear envíos rápidos o repetidos
    const anti = await validateAntiSpam(data, request);
    if (!anti.ok) {
      // Return structured field errors so frontend can show them inline
      const fieldErrors = { message: anti.error };
      return NextResponse.json(
        { success: false, message: anti.error, error: JSON.stringify(fieldErrors) },
        { status: anti.status }
      );
    }

    // Enviar email (obligatorio)
    const emailResult = await sendEmailNotification(data);
    if (!emailResult.success) {
      console.error('Error al enviar email:', emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: 'Error al enviar el formulario',
          error: emailResult.error,
        },
        { status: 500 }
      );
    }

    // Enviar notificación a WhatsApp (no obligatorio, solo registramos si falla)
    const whatsappResult = await sendWhatsAppNotification(data);
    if (!whatsappResult.success) {
      console.warn('Advertencia: Error al enviar WhatsApp:', whatsappResult.error);
    }

    // Retornar éxito
    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado exitosamente',
      email: {
        success: emailResult.success,
        messageId: (emailResult as any).messageId,
        error: (emailResult as any).error,
      },
      whatsapp: whatsappResult,
    });
  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al procesar el formulario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}
