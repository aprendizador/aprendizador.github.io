'use strict';
self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }
  console.log('[SW] conectado');
  const title = 'Aprendizador';
  const message = 'Seja bem vindo agora você não vai perder nenhuma de nossas novidades';
  const iconUrl = 'https://aprendizador.github.io/icons/icon272.png';

  const options =  {
    body: message,
    icon: iconUrl,
    badge: iconUrl
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://aprendizador.blogspot.com.br/?utm_source=push_notifications')
  );
});
