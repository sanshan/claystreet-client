// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  G_API_CLIENT_ID: '514218158699-lp0s3i691fpkea8p2tvifpcc5600o4s9.apps.googleusercontent.com',
  G_API_CLIENT_SECRET: 'FzQ3uqlSKxhbblySrI5w1ldy',
  G_API_REDIRECT: 'http://localhost:4200',
  G_API_DISCOVERY_DOCS: [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
  ],
  G_API_SCOPE: [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
