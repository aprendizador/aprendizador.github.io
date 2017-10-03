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
  console.log('[SW] Notificação recebida.');
  var content = event.data.text();
  content = content.split('|');
  const title = content[0];
  const options = {
    body: content[1],
    icon: 'images/icon.png',
    image: content[2],
    badge: 'images/icon.png',
    tag: content[3],
    data: content[4],
    lang: 'pt_BR'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Clicou na notificação.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data+'?user='+event.notification.tag)
)});

const cacheManifest = [
  "/notify/styles/index.css",
  "/notify/manifest.webapp.json",
  "/notify/scripts/main.js",
  "/notify/icons/icon192.png",
  "/notify/images/icon.png",
  "/notify/index.html",
  "/notify/rdr.html",
  "/favicon.ico"
];
const NAME = 'APR';
const VERSION = '0.0.6';
const currentCacheName = NAME + '-v' + VERSION;

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      console.log('[CACHE] '+currentCacheName+' Intalado com sucesso');
      return cache.addAll(cacheManifest);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(){
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

self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request).catch(function(e) {
      let out = 'Desculpe houve um erro durante a requisção !';
      return new Response(JSON.stringify(out));
    }));
    return;
});
