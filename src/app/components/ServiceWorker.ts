// app/components/ServiceWorker.tsx
'use client';

import { useEffect } from 'react';

// 1 year + random 0-7 day buffer to prevent thundering herd
const UPDATE_INTERVAL_MS =
  365 * 24 * 60 * 60 * 1000 + Math.random() * 7 * 24 * 60 * 60 * 1000;

// Properly typed Service Worker registration
interface CustomServiceWorkerRegistration extends ServiceWorkerRegistration {
  readonly waiting: ServiceWorker | null;
}

export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator))
      return;

    let registration: CustomServiceWorkerRegistration | undefined;
    let controllerChangeHandler: (() => void) | undefined;
    let updateInterval: NodeJS.Timeout | undefined;

    const register = async (): Promise<void> => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });
        registration = reg as CustomServiceWorkerRegistration;

        // Initial update check
        await safeUpdateCheck(registration);

        // Yearly update check with jitter
        updateInterval = setInterval(
          () => registration && safeUpdateCheck(registration),
          UPDATE_INTERVAL_MS
        );

        // Handle controller changes
        controllerChangeHandler = () => {
          if (registration?.waiting) {
            window.location.reload();
          }
        };
        navigator.serviceWorker.addEventListener(
          'controllerchange',
          controllerChangeHandler
        );
      } catch (error: unknown) {
        console.error('Service Worker registration failed:', error);
      }
    };

    const safeUpdateCheck = async (
      reg: CustomServiceWorkerRegistration
    ): Promise<void> => {
      try {
        await reg.update();
        if (reg.waiting && navigator.serviceWorker.controller) {
          window.location.reload();
        }
      } catch (err: unknown) {
        console.warn('Service Worker update check failed:', err);
      }
    };

    // Delay registration to avoid impacting initial load
    const registrationTimer = setTimeout(register, 2000);

    return () => {
      clearTimeout(registrationTimer);
      if (updateInterval) clearInterval(updateInterval);
      if (controllerChangeHandler) {
        navigator.serviceWorker.removeEventListener(
          'controllerchange',
          controllerChangeHandler
        );
      }
    };
  }, []);

  return null;
}
