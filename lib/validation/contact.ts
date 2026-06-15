import { ContactFormData, ContactFormErrors } from '@/lib/types/contact';
import { z } from 'zod';

const contactSchema = z
  .object({
    name: z
      .string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre es requerido',
      })
      .trim()
      .min(1, 'El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(80, 'El nombre no debe superar 80 caracteres'),
    email: z
      .string({
        required_error: 'El correo es requerido',
        invalid_type_error: 'El correo es requerido',
      })
      .trim()
      .min(1, 'El correo es requerido')
      .max(120, 'El correo no debe superar 120 caracteres')
      .email('Ingresa un correo válido'),
    subject: z
      .string({
        required_error: 'El asunto es requerido',
        invalid_type_error: 'El asunto es requerido',
      })
      .trim()
      .min(1, 'El asunto es requerido')
      .min(3, 'El asunto debe tener al menos 3 caracteres')
      .max(120, 'El asunto no debe superar 120 caracteres'),
    message: z
      .string({
        required_error: 'El mensaje es requerido',
        invalid_type_error: 'El mensaje es requerido',
      })
      .trim()
      .min(1, 'El mensaje es requerido')
      .min(10, 'El mensaje debe tener al menos 10 caracteres')
      .max(3000, 'El mensaje no debe superar 3000 caracteres'),
    website: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.website.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['message'],
        message: 'No se pudo enviar el formulario.',
      });
    }
  });

function formatErrors(error: z.ZodError): ContactFormErrors {
  const errors: ContactFormErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      (field === 'name' ||
        field === 'email' ||
        field === 'subject' ||
        field === 'message') &&
      !errors[field]
    ) {
      errors[field] = issue.message;
    }
  }

  return errors;
}

export function parseContactFormData(
  data: unknown
): { data: ContactFormData | null; errors: ContactFormErrors } {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      data: null,
      errors: formatErrors(result.error),
    };
  }

  return {
    data: result.data,
    errors: {},
  };
}

export function validateContactForm(
  data: ContactFormData
): ContactFormErrors {
  return parseContactFormData(data).errors;
}

export function isFormValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
