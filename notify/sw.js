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
    clients.openWindow('https://aprendizador.github.io/notify/sw.html')
)});
const NAME = 'APR';
const VERSION = '0.0.2';
const cacheManifest = [
  "/notify/icons/icon128.png",
  "/notify/icons/icon16.png",
  "/notify/icons/icon192.png",
  "/notify/icons/icon272.png",
  "/notify/icons/icon512.png",
  "/notify/icons/icon32.png",
  "/notify/icons/icon60.png",
  "/notify/icons/icon64.png",
  "/notify/icons/icon90.png",
  "/notify/images/icon.png",
  "/notify/manifest.webapp.json",
  "/notify/scripts/main.js",
  "/notify/styles/index.css",
  "/notify/rdr.html",
  "/notify/",
  "/notify/index.html"
];
self.addEventListener('install', function(event) {
  const currentCacheName = NAME + '-v' + VERSION;
    const urls = cacheManifest.map(url => {
      return new Request(url, {credentials: 'same-origin'});
    });
    caches.open(currentCacheName).then(function(cache) {
        console.log('[CACHE] '+NAME+' Versão: v'+VERSION+' instalada com sucesso');
        return cache.addAll(urls);
    });
  self.skipWaiting();
});
self.addEventListener('activate', function(){
  const currentCacheName = NAME + '-v' + VERSION;
  caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(function(cacheName){
        if (cacheName.indexOf(NAME) === -1) {
          return null;
        }

        if (cacheName !== currentCacheName) {
          console.log('[CACHE] '+cacheName+' que estava desatualizado removido com sucesso');
          return caches.delete(cacheName);
        }

        return null;
      })
    );
  });
  self.clients.claim();
});
  evt.waitUntil(
    caches
      .open(NAME + '-v' + VERSION)
      .then(cache => {
        console.log('[CACHE] APR Versão: v'+VERSION+' instalada com sucesso');
        return cache.addAll(urls);
      }));

  self.skipWaiting();
};
