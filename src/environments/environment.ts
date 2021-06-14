// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  backend_host: 'http://localhost:4200/api',

  firebase: {
    apiKey: 'AIzaSyCUAgyIZ5xhsqOSrgxHFz2kfQ10QzVNNSk',
    authDomain: 'deepmedia-2021-06-11.firebaseapp.com'
  },

  connectors: {
    'google': 'Google Ads'
  },

  // Google connector
  google_connector_client_id: '948944098080-lab1o13nrfs1ug53js3a663pfls7d20f.apps.googleusercontent.com'
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
