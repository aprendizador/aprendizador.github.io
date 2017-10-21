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
  console.log('[USER] Clicou na notificação.');
  event.notification.close();
  event.waitUntil(
     clients.openWindow(event.notification.data+'?utm_source=web-push-notification&utm_campaign=article-'+event.notification.title+'&utm_content=user-'+event.notification.tag)
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
const VERSION = '0.1.3';
const currentCacheName = NAME + '-v' + VERSION;

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(function(cacheName){

        if (cacheName !== currentCacheName) {
          caches.open(currentCacheName).then(function(cache) {
          console.log('[CACHE] '+currentCacheName+' Intalado com sucesso');
          return cache.addAll(cacheManifest);
        })
        }
        return null;
      })
    );
  }));
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
  if (event.request.url == 'https://aprendizador.github.io/notify/scripts/main.js'){
    event.respondWith(fetch(event.request).catch(function(e) {
      console.info('[SW] trabalhando em cache');
      let out = "var btn = document.querySelector('.js-reload');\nbtn.addEventListener('click', function(event) {\nwindow.reload();\n});";
      return new Response(out);
    }));
  }
  else if (event.request.url == 'https://aprendizador.github.io/notify/styles/index.css'){
    event.respondWith(fetch(event.request).catch(function(e) {
      console.info('[SW] trabalhando em cache');
      let out = ".mdl-button--raised {background: rgba(158,158,158,.2);box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);}\n.mdl-button {box-sizing: border-box;align-items: flex-start;background: 0 0;border: none;border-radius: 2px;color: #000;position: relative;height: 36px;margin: 0;min-width: 64px;padding: 0 16px;display: inline-block;font-family: 'Roboto','Helvetica','Arial',sans-serif;font-size: 14px;font-weight: 500;text-transform: uppercase;letter-spacing: 0;overflow: hidden;will-change: box-shadow;transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);outline: none;cursor: pointer;text-decoration: none;text-align: center;line-height: 36px;vertical-align: middle;text-shadow: none;text-indent: 0px;font: 13.3333px Arial;word-spacing: normal;text-rendering: auto;}\n.mdl-button{-webkit-tap-highlight-color: rgba(255,255,255,0);}\nbutton {padding: 1px 6px;}\nhtml, body {font-family: 'Helvetica','Arial',sans-serif;font-size: 14px;font-weight: 400;line-height: 20px;margin: 0;padding: 0;}\nhtml {color: rgba(0,0,0,.87);}\n::selection {background: #b3d4fc;text-shadow: none;}";
      return new Response(out);
      }));
  }
  else if (event.request.url == 'https://aprendizador.github.io/notify/manifest.webapp.json'){
    event.respondWith(fetch(event.request).catch(function(e) {
      console.info('[SW] trabalhando em cache');
      let out = "{\n"+'"name": "Aprendizador",'+"\n"+'"description": "Saiba mais, agora",'+"\n"+'"short_name": "Aprendizador",'+"\n"+'"display": "sandalone",'+"\n"+'"theme_color": "#ed6b4b",'+"\n"+'"start_url": "/notify/rdr.html?utm_source=web_app_manifest&utm_medium=screen_initial&utm_campaign=notify_push",'+"\n"+'"scope": "/notify/",'+"\n"+'"orientation":"portrait",'+"\n"+'"background_color": "#ed6b4b",'+"\n"+'"icons": ['+"\n{\n"+'"src": "icons/icon16.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "16x16"'+"\n},\n{\n"+'"src": "icons/icon32.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "32x32"'+"\n},\n{\n"+'"src": "icons/icon60.png",'+"\n"+'"type": "image/png",'+"\n"+"sizes": "60x60"+"\n"+"},\n{\n"+'"src": "icons/icon64.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "64x64"'+"\n},\n{\n"+'"src": "icons/icon90.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "90x90"'+"\n},\n{\n"+'"src": "icons/icon128.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "128x128"'+"\n},\n{\n"+'"src": "icons/icon192.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "192x192"'+"\n},\n{\n"+'"src": "icons/icon272.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "272x272"'+"\n},\n{\n"+'"src": "icons/icon512.png",'+"\n"+'"type": "image/png",'+"\n"+'"sizes": "512x512"'+"\n}\n]\n};";
      return new Response(out);
      }));
  }
  else if (event.request.url == 'https://aprendizador.github.io/notify/index.html' || event.request.url ==  'https://aprendizador.github.io/notify/'){
    event.respondWith(fetch(event.request).catch(function(e) {
      console.info('[SW] trabalhando em cache');
      let out = "<!DOCTYPE html>\n<html>\n<head>\n<title>Notificações | Aprendizador</title>\n<meta charset='utf-8'>\n<meta http-equiv='X-UA-Compatible' content='IE=edge'>\n<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n</head>\n<link rel='stylesheet' type='text/css' href='styles/index.css'>\n<link rel='manifest' href='manifest.webapp.json'>\n<body>\n<h1>Ops! você está sem conexão com a internet</h1>\n"+'<button class="js-reload mdl-button mdl-button--raised">Recarregar</button>'+"\n</body>";
      return new Response(out);
    }));
  }
  else{
    console.info('[SW] trabalhando em cache');
    let out = "";
    return new Response(out);
  }
  return;
});
