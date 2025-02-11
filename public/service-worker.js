// self.addEventListener('push', event => {
//   const data = event.data.json();
//   const title = data.title || '기본 제목';
//   const options = {
//     body: data.body || '기본 내용',
//     icon: data.icon || '/icon.png',
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/service-worker.js')
//     .then(registration => {
//       console.log('Service Worker 등록 성공', registration);
//     })
//     .catch(error => {
//       console.error('Service Worker 등록 실패', error);
//     });
// }

// const requestNotificationPermission = async () => {
//   const permission = await Notification.requestPermission();
//   if (permission === 'granted') {
//     console.log('푸시 알림 권한이 허용되었습니다.');
//   } else {
//     console.log('푸시 알림 권한이 거부되었습니다.');
//   }
// };

// const subscribeUserToPush = async () => {
//   const registration = await navigator.serviceWorker.getRegistration();
//   const subscription = await registration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlB64ToUint8Array('VAPID KEY'),
//   });

//   await sendSubscriptionToServer(subscription);
// };

// const sendSubscriptionToServer = async subscription => {
//   await fetch('/notification', {
//     method: 'GET',
//     body: JSON.stringify(subscription),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// const webPush = require('web-push');

// // const pushSubscription = {사용자 구독정보?}
// const pushSubscription = {};
// const payload = JSON.stringify({ title: '새 알림', body: '새로운 메시지가 도착했습니다.' });

// webPush
//   .sendNotification(pushSubscription, payload)
//   .then(response => console.log('푸시 알림 전송 성공:', response))
//   .catch(error => console.error('푸시 알림 전송 실패:', error));

// self.addEventListener('notificationclick', event => {
//   event.notification.close();
//   event.waitUntil(clients.openWindow('/your-redirect-url'));
// });
