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

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BMFvHKS6_S2qScf6WZ35oNPpEuNaVjwK5qXvoYtlOm1luD8anvCoxH2jXtjPHW8WIz0vrA4hrgCFlR7-L6pKvo8';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('[SW] & [PUSH] suportados');
  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('[SW] iniciado', swReg);
    swRegistration = swReg;
    navigator.serviceWorker.register('sw.js')
    initialiseUI();
  })
  .catch(function(error) {
    console.error('[SW] Erro', error);
    pushButton.textContent = 'Erro, tente atualizar a página';
  });
} else {
  console.warn('[PUSH] não suportado');
  pushButton.textContent = 'Notifições não suportadas';
}
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Notifições bloqueadas.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }
  else if (isSubscribed) {
    pushButton.textContent = 'Desativar Notifições';
    pushButton.disabled = false;
  } else {
    pushButton.textContent = 'Ativar Notifições';
    pushButton.disabled = false;
  }
}
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    }
    else{
      subscribeUser();
    }
  });
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);
    if (isSubscribed) {
      console.log('[USER] Notifições Ativadas.');
    } else {
      console.log('[USER] Notifições não Ativadas.');
    }
    updateBtn();
  });
}
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    if (updateSubscriptionOnServer(subscription, 'Adicione')){
      console.log('[USER] Notifições Ativadas', subscription);
      isSubscribed = true;
      updateBtn();
    }
  })
  .catch(function(err) {
    console.log('[USER] Erro : ', err);
    updateBtn();
  });
}
function updateSubscriptionOnServer(subscription, action) {
  var httpRequest = new XMLHttpRequest();
  subscription = JSON.stringify(subscription);
  httpRequest.open('GET', 'https://api.telegram.org/bot404001562:AAF3vZLkoxC3snhZum76IAHKg7DZfcTPkko/sendMessage?chat_id=266061493&text='+action+' o usuário cujo o código JSON é: /n '+subscription);
  if (httpRequest.send()){
     return true;
 }
}
function unsubscribeUser() {
  var sub = swRegistration.pushManager.getSubscription();
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('[USER] Erro ao desativar as notifições.', error);
  })
  .then(function() {
    if (updateSubscriptionOnServer(sub, 'Remova')){
      console.log('[USER] Notifições desativadas.');
      isSubscribed = false;
      updateBtn();
    }
  });
}
