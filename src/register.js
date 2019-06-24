const register = (swUrl, config) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl, config)
        .then(registration => {
          console.log(`ServiceWorker registered for ${registration.scope}`);

        })
        .catch(() => console.error(`There was a problem registering ServiceWorker from: ${swUrl}`));
    });
  }

  console.log('notification');
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  return config;
}

export default register;