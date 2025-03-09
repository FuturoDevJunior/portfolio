import './index.css';

import React, { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import App from './App';
// Importando do arquivo index.ts central para melhor organização
import {
  PrivacyPolicy,
  TermsOfUse,
} from './components';

// Registro do Service Worker para melhorar experiência offline e cache
// Simplificado para evitar problemas de tipagem
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('Erro ao registrar SW:', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
