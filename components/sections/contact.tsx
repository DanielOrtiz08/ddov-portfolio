'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { ContactFormData, ContactFormErrors } from '@/lib/types/contact';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ddov0811@gmail.com',
    href: 'mailto:ddov0811@gmail.com',
    color: 'from-red-500 to-black-400',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/daniel-ortiz-villanueva',
    href: 'https://www.linkedin.com/in/daniel-david-ortiz-villanueva-7a8053257',
    color: 'from-blue-600 to-black-500',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@ddov0811',
    href: 'https://github.com/DanielOrtiz0811',
    color: 'from-slate-600 to-black-200',
  },
];

export function ContactSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFormErrors({});
    setIsSubmitting(true);

    // Validación cliente rápida
    const clientErrors: ContactFormErrors = {};
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) clientErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) clientErrors.email = 'El correo es requerido';
    else if (!EMAIL_REGEX.test(formData.email.trim())) clientErrors.email = 'Ingresa un correo válido';
    if (!formData.subject.trim()) clientErrors.subject = 'El asunto es requerido';
    if (!formData.message.trim()) clientErrors.message = 'El mensaje es requerido';

    if (Object.keys(clientErrors).length > 0) {
      setFormErrors(clientErrors);
      setErrorMessage('Por favor corrige los campos marcados');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Manejar errores de validación retornados por la API
        if (result?.error && typeof result.error === 'string') {
          try {
            const errors = JSON.parse(result.error);
            setFormErrors(errors);
            // Mostrar los errores inline en los campos, no alert superior
            setErrorMessage(null);
          } catch {
            setErrorMessage(result.error || 'Error al enviar el formulario');
          }
        } else {
          setErrorMessage(result.message || 'Error al enviar el formulario');
        }
        return;
      }

      // Éxito
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });

      // Reset después de 5 segundos
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al enviar el formulario'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in working together? Let&apos;s connect and discuss how I can help with your projects
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted transition-colors group"
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br',
                        method.color
                      )}
                    >
                      <method.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{method.label}</p>
                      <p className="font-medium">{method.value}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Mail className="h-4 w-4" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-black-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Santa Marta, Colombia</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {errorMessage && (
                    <Alert>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-1" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </div>
                    </Alert>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium block mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={80}
                        className="bg-card"
                        aria-invalid={!!formErrors.name}
                      />
                      {formErrors.name && (
                        <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium block mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={120}
                        className="bg-card"
                        aria-invalid={!!formErrors.email}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-sm font-medium block mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      maxLength={120}
                      className="bg-card"
                      aria-invalid={!!formErrors.subject}
                    />
                    {formErrors.subject && (
                      <p className="text-sm text-destructive mt-1">{formErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium block mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      maxLength={3000}
                      className="bg-card resize-none"
                      aria-invalid={!!formErrors.message}
                    />
                    {formErrors.message && (
                      <p className="text-sm text-destructive mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gradient text-white h-12 rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
