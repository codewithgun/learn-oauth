# Learn OAuth

## Facebook (Setup steps)

- First, go to https://developers.facebook.com/apps and create a new app. Choose `consumer` as the app type. Different app type offer different products such as facebook login (oauth), webhook, and much more, which can be added to your app later on.
- After the app has been created, go to the app dashboard and add `facebook login` product to your app.
- Now, go to the setting of the `facebook login` product of your app, then add your api URL for facebook callback at `Valid OAuth Redirect URIs` field. Example: `https://localhost:3000/auth/facebook/callback`
- Remember to prepare 2 endpoints in your app. One for the client to be redirected to facebook app authentication page. Another one is for the oauth response (the callback at the previous step).
- You may request for additional user information from facebook such as user likes, profile picture, last checked in and much more. Most of the information require you to request an `app review` before you can access it.

### Useful links

- https://developers.facebook.com/tools/explorer/
- https://developers.facebook.com/docs/permissions/reference/public_profile/

### How it works ?

- First, when user navigate to the url `https://localhost:3000/auth/facebook`, the server will response with `302` status code, which will redirect the browser to facebook oauth dialog page. Eg: `https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth%2Ffacebook%2Fcallback&client_id=166453568983174`. The url will display a page with oauth of the app, which ask the user to either authorize or reject the app.
- After the user `authorize` or `rejected` the app, the facebook will response with `302` status code, together with `code` query string to the callback endpoint you registered in the `facebook login` app. Eg: `https://localhost:3000/auth/facebook/callback?code=AQDr9UQYeiNs2ZRWrDPiBJdSc6yN3Dl-22jkbcG5ZHd4fC6iyfR9-IOq7xzY-zvuPGWH2xx6-Y0ysSb7slsbAH9K01Zl82orEjMNv8Pqo0rMKrG-yAGrsgjeMNIlMf82PDc-QvVJKEiW9lSCastC7-XAh36ItaALZIl0dq2F6-jqCJtISN2iEZlnagF6Q4bkEb34EFdHf8r5hk0UN4MwzdoRA0Tw4fXkrFbAdR73h3G4JPPVON5RRIrKBVFsaLUbwk_2nBeT0Y0K7ucZuakk8JFozoEB9Y6pe9EPewPiqklfPKKbB2dFxWaNBqLwEFIJJB19Mcl9Os6hEirqj3blT29pUKrL7bwDGdkyLXpZd9gR6A4_TUFDxoVx95dTMc54Ga5XejECsEVpaSlEsVyIsoXWJ2qS8oxMbIOQgF3b0KP7xg#_=_`
- Next, the browser will redirect the whole `code` query string to your local callback api.
- After your server received the information from the callback, the server should decide whether to create a new user, authorize the user, or reject it.
