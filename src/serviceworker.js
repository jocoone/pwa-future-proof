self.addEventListener('install', event => console.log('ServiceWorker installed successfully!'));
self.addEventListener('activate', event => console.log('ServiceWorker activated successfully!'));

self.addEventListener('push', event => {
  if (Notification.permission === 'granted') {
    var options = {
      body: event.data.text(),
      icon: 'images/logo_128x128.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      }
    };
    event.waitUntil(
      self.registration.showNotification(event.data.text(), options)
    );
  }
});

workbox.precaching.precacheAndRoute([
  ...self.__precacheManifest,
  'images/logo_128x128.png',
  'images/logo_192x192.png',
  'images/logo_512x512.png'
]);

workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst());