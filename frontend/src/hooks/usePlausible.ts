import { useEffect } from 'react';
import Plausible from 'plausible-tracker';

// Configuração padrão do Plausible
const plausibleOptions = {
    domain: 'devferreirag.com',
    trackLocalhost: false,
    apiHost: 'https://plausible.io'
};

// Inicializar Plausible
const plausible = Plausible(plausibleOptions);

/**
 * Hook para integração do Plausible Analytics
 * 
 * Uso:
 * - usePlausible() - Rastreia automaticamente pageviews e outbound links
 * - usePlausible('event-name', { props }) - Rastreia evento customizado
 */
export function usePlausible(eventName?: string, eventProps?: Record<string, string | number | boolean>) {
    // Iniciar rastreamento automático de pageviews
    const { enableAutoPageviews, enableAutoOutboundTracking } = plausible;

    useEffect(() => {
        // Configurar rastreamento automático
        enableAutoPageviews();
        enableAutoOutboundTracking();

        return () => {
            // Cleanup se necessário em aplicações de página única
        };
    }, [enableAutoPageviews, enableAutoOutboundTracking]);

    // Rastrear evento customizado, se fornecido
    useEffect(() => {
        if (eventName) {
            plausible.trackEvent(eventName, { props: eventProps });
        }
    }, [eventName, eventProps]);

    // Retornar a função de rastreamento para uso direto
    return {
        trackEvent: plausible.trackEvent,
        trackPageview: plausible.trackPageview
    };
} 