import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setErrorMessage('');
    setValidationErrors({});
  };

  return (
    <div>
      {status === 'success' ? (
        <div
          className="bg-green-900/20 border border-green-700 rounded-lg p-8 text-center"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-xl font-bold text-white mb-2">{t('contact.form.successTitle')}</h3>
          <p className="text-gray-300 mb-6">{t('contact.form.successMessage')}</p>
          <button
            onClick={resetForm}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {t('contact.form.sendAnother')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.form.name')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${validationErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-800 focus:ring-purple-500'
                } text-white focus:outline-none focus:ring-2 focus:border-transparent transition-colors disabled:opacity-60`}
              placeholder={t('contact.form.namePlaceholder')}
              aria-describedby={validationErrors.name ? 'name-error' : undefined}
              aria-invalid={!!validationErrors.name}
            />
            {validationErrors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-400">
                {validationErrors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.form.email')} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${validationErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-800 focus:ring-purple-500'
                } text-white focus:outline-none focus:ring-2 focus:border-transparent transition-colors disabled:opacity-60`}
              placeholder={t('contact.form.emailPlaceholder')}
              aria-describedby={validationErrors.email ? 'email-error' : undefined}
              aria-invalid={!!validationErrors.email}
            />
            {validationErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.form.message')} <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${validationErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-800 focus:ring-purple-500'
                } text-white focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-none disabled:opacity-60`}
              placeholder={t('contact.form.messagePlaceholder')}
              aria-describedby={validationErrors.message ? 'message-error' : undefined}
              aria-invalid={!!validationErrors.message}
            />
            {validationErrors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-400">
                {validationErrors.message}
              </p>
            )}
          </div>

          {status === 'error' && (
            <div
              className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-200 text-sm flex items-center gap-2"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span>{errorMessage || t('contact.form.errorMessage')}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                {t('contact.form.sending')}
              </>
            ) : (
              t('contact.form.submit')
            )}
          </button>
        </form>
      )}
    </div>
  );
}