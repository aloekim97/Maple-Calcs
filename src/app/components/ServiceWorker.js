// app/components/ServiceWorker.tsx
'use client';

import { useEffect } from 'react';

export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            '/sw.js',
            {
              scope: '/',
              updateViaCache: 'none',
            }
          );

          // Check for updates immediately
          registration.update();

          // Handle controller change
          const handleControllerChange = () => {
            window.location.reload();
          };

          // Handle updates
          const handleUpdateFound = () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            const handleStateChange = () => {
              switch (newWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    showUpdateNotification();
                  }
                  break;
                case 'redundant':
                  console.log('Service worker became redundant');
                  break;
              }
            };

            newWorker.addEventListener('statechange', handleStateChange);
          };

          // Set up event listeners
          navigator.serviceWorker.addEventListener(
            'controllerchange',
            handleControllerChange
          );
          registration.addEventListener('updatefound', handleUpdateFound);

          // Periodic update checks (every 6 hours)
          const updateInterval = setInterval(() => {
            registration.update().catch((err) => {
              console.warn('Failed to check for service worker updates:', err);
            });
          }, 6 * 60 * 60 * 1000);

          // Cleanup function
          return () => {
            clearInterval(updateInterval);
            navigator.serviceWorker.removeEventListener(
              'controllerchange',
              handleControllerChange
            );
            registration.removeEventListener('updatefound', handleUpdateFound);
          };
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      // Delay registration to avoid impacting initial load
      const registrationTimer = setTimeout(registerServiceWorker, 1500);

      return () => clearTimeout(registrationTimer);
    }
  }, []);

  return null;
}

function showUpdateNotification() {
  if (document.getElementById('sw-update-notification')) return;

  const notification = document.createElement('div');
  notification.id = 'sw-update-notification';
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '16px';
  notification.style.background = '#1a1a1a';
  notification.style.color = 'white';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  notification.style.zIndex = '9999';
  notification.style.display = 'flex';
  notification.style.flexDirection = 'column';
  notification.style.gap = '8px';
  notification.style.maxWidth = '300px';
  notification.innerHTML = `
    <p style="margin: 0; font-size: 14px;">A new version is available!</p>
    <div style="display: flex; gap: 8px;">
      <button style="flex: 1; padding: 8px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Update Now
      </button>
      <button style="flex: 1; padding: 8px; background: transparent; color: #aaa; border: 1px solid #444; border-radius: 4px; cursor: pointer;">
        Later
      </button>
    </div>
  `;

  const [updateBtn, laterBtn] = notification.querySelectorAll('button');

  updateBtn.addEventListener('click', () => {
    window.location.reload();
  });

  laterBtn.addEventListener('click', () => {
    notification.remove();
  });

  // Auto-dismiss after 30 seconds
  const autoDismissTimer = setTimeout(() => {
    notification.remove();
  }, 30000);

  // Cleanup timer if manually dismissed
  laterBtn.addEventListener('click', () => {
    clearTimeout(autoDismissTimer);
  });

  document.body.appendChild(notification);
}
