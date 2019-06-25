# What todo?

## 1. Choose a prefered project (separate branches)

* Fork repository https://github.com/jocoone/pwa-future-proof

	- pwa-native (native html, css, js)
	- pwa-react (react project, react-scripts project, workbox)
	- pwa-angular (angular project, angular/cli project)

* Create an account on https://www.netlify.com/
* Add a new site from git

	- Github (Go through the authorize flow)
	- Pick the correct repository
	- Pick the correct branch (depending on the project you choose)
	- Add `npm run build` to the *Build command* (except for native)
	- Add the correct *Publish directory* (build for React and dist for Angular)
	- Deploy site

## 2. manifest.json

* Add a manifest.json file (name, short_name, scope, start_url, icons, display, ...)

	- React: in public folder
	- Angular: in src folder, don't forget to add file to angular.json (assets array)

* Link manifest.json file in your index.html with the correct tag
* Verify manifest.json file in Chrome Devtools
* Because support for iOS is still minimal, Look on the internet for the correct iOS meta tags and icons you need to provide.

## 3. pokedex-serviceworker.js

* Add an empty pokedex-serviceworker.js inside your *src* directory
* Implement the register function inside *src/register.ts|js* (apply Progressive Enhancement) (except for native: script tag in index.html)
	- Log statement for success and fail
* Implement temporary install and activate event and log a message

## 4. App

* Implement the missing code for the app (fetch pokemons and display in the UI, make pagination work)

## 5. serviceworker 2

* Perform precaching of your application build files

	- React: Add following piece of code
	```
  workbox.precaching.precacheAndRoute([
    ...self.__precacheManifest,
    // TODO cache icons here
  ]);

  workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst());
  ```

	- Angular: perform following commands (these will do a lot for you. These commands will probably fail due to icons that already exist. You can rename them and re-add them later. Also remove created manifest file and use your own created in step 1)

	```
  npm i -g @angular/cli
  ```
	```
  ng add @angular/pwa --project pwa-future-proof
  ```

	Look around in the project files and see what happened.

	- Native: perform precaching manually like shown in the slides with all the application files you created.

	Tip:
	```
  self.addEventlistener('install', event => {
		event.waitUntil(caches.open(CACHE_NAME).then(cache => { ... }))
	});
  ```

* Create a custom offline.html file and make sure the file is added to the build and precached in the service worker.
* Make sure if the network is lost, the failure of the index.html file request displays a the custom offline.html page from the previous step.
* Add the fetch event to the service worker file to cache network requests to the pokemon api. (This caching will only work in production. The request locally will go to the pokeapi itself and in production a netlify function. This function is a gateway to the same pokeapi but hosted on the same origin as the webapp. That's why these requests pass through the serviceworker.)

## 6. Install

* Add a *beforeinstallprompt* event listener and add a custom component to trigger installation of the PWA.

## 7. Push notifications

* Add following codesnippet to request for permission to show notifications:

```
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });
```

* Add the correct event listener to the service worker to show the push notification. Use following code inside the event callback:

```
if (Notification.permission === 'granted') {
    var options = {
      body: event.data.text(),
      icon: 'images/logo_128x128.png',
    };
    event.waitUntil(
      self.registration.showNotification(event.data.text(), options)
    );
  }
  ```

* Test the push notification inside your Chrome Devtools > Application > serviceworker > push

## 8. Extra

* Think of extra features you can add to the application.
