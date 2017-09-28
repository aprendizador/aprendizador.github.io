/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
* 
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Notificação recebida.');
  var content = event.data.text();
  content = content.split('|');
  const title = content[0];
  const options = {
    body: content[1],
    icon: 'images/icon.png',
    badge: 'images/icon.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Clicou na notificação.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://127.0.0.1/sw.html')
)});
const NAME = 'APR';
const VERSION = '0.0.1';
const currentCacheName = NAME + '-v' + VERSION;
const cacheManifest = [
  "https://aprendizador.github.io/notify/icons/icon128.png",
  "https://aprendizador.github.io/notify/icons/icon16.png",
  "https://aprendizador.github.io/notify/icons/icon192.png",
  "https://aprendizador.github.io/notify/icons/icon272.png",
  "https://aprendizador.github.io/notify/icons/icon32.png",
  "https://aprendizador.github.io/notify/icons/icon60.png",
  "https://aprendizador.github.io/notify/icons/icon64.png",
  "https://aprendizador.github.io/notify/icons/icon90.png",
  "https://aprendizador.github.io/notify/images/icon.png",
  "https://aprendizador.github.io/notify/manifest.webapp.json",
  "https://aprendizador.github.io/notify/scripts/main.js",
  "https://aprendizador.github.io/notify/styles/index.css",
  "https://aprendizador.github.io/notify/sw.js"
];
self.oninstall = evt => {
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.indexOf(NAME) === -1) {
          return null;
        }

        if (cacheName !== currentCacheName) {
        const urls = cacheManifest.map(url => {
          return new Request(url, {credentials: 'include'});
        });
          evt.waitUntil(
            caches
              .open(NAME + '-v' + VERSION)
              .then(cache => {
                return cache.addAll(urls);
              }));

          self.skipWaiting();
        }
      })
    );
  });

};
self.onactivate = _ => {
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.indexOf(NAME) === -1) {
          return null;
        }

        if (cacheName !== currentCacheName) {
          return caches.delete(cacheName);
        }

        return null;
      })
    );
  });

  self.clients.claim();
};
