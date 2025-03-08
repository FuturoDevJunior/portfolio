import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function ContactForm() {
  const { t } = useLanguage();

  // Defina o tipo FormStatus para garantir consistência
  type FormStatus = 'idle' | 'loading' | 'success' | 'error';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const formId = 'contact-form';

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = t('contact.form.errors.nameRequired');
    if (!formData.email.trim()) errors.email = t('contact.form.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = t('contact.form.errors.emailInvalid');
    if (!formData.message.trim()) errors.message = t('contact.form.errors.messageRequired');

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // Reset states
      setStatus('loading');
      setErrorMessage('');

      // EmailJS integration
      await emailjs.send(
        'service_f4puwv2',  // Service ID
        'template_90idoa7', // Template ID
        formData,
        'g4cELeccnMKpDAAIF'  // Public Key
      );

      // Success - clear form and show success message
      setFormData({ name: '', email: '', message: '' });
      setStatus('success');

      // Reset the success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Renderização condicional com base no estado
  const isSuccess = status === 'success';
  const isLoading = status === 'loading';
  const isError = status === 'error';

  return (
    <>
      <h3 id={formId} className="text-2xl font-bold mb-6">
        {t('contact.form.title')}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        aria-labelledby={formId}
        noValidate
      >
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            {t('contact.form.name')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 bg-black/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors ${validationErrors.name ? 'border-red-500' : 'border-gray-700'
              }`}
            aria-required="true"
            aria-invalid={!!validationErrors.name}
            aria-describedby={validationErrors.name ? 'name-error' : undefined}
          />
          {validationErrors.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
              {validationErrors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            {t('contact.form.email')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 bg-black/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors ${validationErrors.email ? 'border-red-500' : 'border-gray-700'
              }`}
            aria-required="true"
            aria-invalid={!!validationErrors.email}
            aria-describedby={validationErrors.email ? 'email-error' : undefined}
          />
          {validationErrors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {validationErrors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            {t('contact.form.message')} <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full p-3 bg-black/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors ${validationErrors.message ? 'border-red-500' : 'border-gray-700'
              }`}
            aria-required="true"
            aria-invalid={!!validationErrors.message}
            aria-describedby={validationErrors.message ? 'message-error' : undefined}
          />
          {validationErrors.message && (
            <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
              {validationErrors.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            aria-live="polite"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>{t('contact.form.sending')}</span>
              </>
            ) : (
              <span>{t('contact.form.submit')}</span>
            )}
          </button>
        </div>

        {isSuccess && (
          <div className="flex items-center gap-2 text-green-400 p-3 bg-green-400/10 rounded-lg mt-4" role="status">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            <span>{t('contact.form.success')}</span>
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-2 text-red-400 p-3 bg-red-400/10 rounded-lg mt-4" role="alert">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
            <span>{errorMessage || t('contact.form.error')}</span>
          </div>
        )}
      </form>
    </>
  );
}