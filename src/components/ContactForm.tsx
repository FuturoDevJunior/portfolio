import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CheckCircle2, Loader2 } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div>
      {status === 'success' ? (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{t('contact.form.successTitle')}</h3>
          <p className="text-gray-300 mb-6">{t('contact.form.successMessage')}</p>
          <button
            onClick={resetForm}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            {t('contact.form.sendAnother')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:opacity-60"
              placeholder={t('contact.form.namePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:opacity-60"
              placeholder={t('contact.form.emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none disabled:opacity-60"
              placeholder={t('contact.form.messagePlaceholder')}
            />
          </div>

          {status === 'error' && (
            <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-200 text-sm">
              {errorMessage || t('contact.form.errorMessage')}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:bg-purple-600"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
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