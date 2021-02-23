import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';
import {environment} from '../environments/environment';
import {AppNavbarModule} from './modules/app-navbar/app-navbar.module';
import {UserService} from './services/auth.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AppSidenavModule} from './modules/app-sidenav/app-sidenav.module';
import {AppSourceListModule} from './modules/app-source-list/app-source-list.module';
import {AppSheetViewModule} from './modules/app-sheet-view/app-sheet-view.module';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.G_API_CLIENT_ID,
  discoveryDocs: environment.G_API_DISCOVERY_DOCS,
  ux_mode: 'redirect',
  redirect_uri: environment.G_API_REDIRECT,
  scope: environment.G_API_SCOPE.join(' ')
};

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
        }),
        AppNavbarModule,
        MatButtonModule,
        MatIconModule,
        AppSidenavModule,
        AppSourceListModule,
        AppSheetViewModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private user: UserService
  ) {
    this.user.auth().subscribe(this.user.setToken);
  }
}
