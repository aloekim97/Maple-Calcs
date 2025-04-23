// app/components/ServiceWorker.tsx
'use client';

import { useEffect } from 'react';

export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            '/sw.js',
            {
              scope: '/',
              updateViaCache: 'none',
            }
          );

          // Immediate update check
          registration.update();

          // Handle controller change (when new SW takes over)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Controller changed - reloading page');
            window.location.reload();
          });

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              console.log('New worker state:', newWorker.state);

              if (newWorker.state === 'installed') {
                // Only show update if there's an existing controller (not first install)
                if (navigator.serviceWorker.controller) {
                  console.log('New update available!');
                  // Here you could show a UI prompt to refresh
                  showUpdateNotification();
                }
              }
            });
          });

          // Periodic update checks (every 24 hours)
          const updateInterval = setInterval(() => {
            registration.update();
          }, 24 * 60 * 60 * 1000);

          return () => clearInterval(updateInterval);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      // Delay registration slightly to avoid impacting initial load
      const timer = setTimeout(registerSW, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}

// Optional: Show update notification to user
function showUpdateNotification() {
  // Implement your UI notification logic here
  // For example:
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '10px';
  notification.style.background = '#333';
  notification.style.color = 'white';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '1000';
  notification.innerHTML = `
    <p>New version available!</p>
    <button style="margin-top: 5px; padding: 5px 10px; background: #555; color: white; border: none; border-radius: 3px;">
      Refresh
    </button>
  `;

  const button = notification.querySelector('button');
  button?.addEventListener('click', () => {
    window.location.reload();
  });

  document.body.appendChild(notification);
}
