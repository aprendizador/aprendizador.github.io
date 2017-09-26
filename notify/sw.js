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