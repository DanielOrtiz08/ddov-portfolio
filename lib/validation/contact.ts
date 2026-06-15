import { ContactFormData, ContactFormErrors } from '@/lib/types/contact';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  data: ContactFormData
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  // Validar nombre
  if (!data.name.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  // Validar email
  if (!data.email.trim()) {
    errors.email = 'El correo es requerido';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Ingresa un correo válido';
  }

  // Validar asunto
  if (!data.subject.trim()) {
    errors.subject = 'El asunto es requerido';
  } else if (data.subject.trim().length < 3) {
    errors.subject = 'El asunto debe tener al menos 3 caracteres';
  }

  // Validar mensaje
  if (!data.message.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errors;
}

export function isFormValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
