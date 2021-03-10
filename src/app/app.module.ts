import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';
import {environment} from '../environments/environment';
import {AppNavbarModule} from './modules/app-navbar/app-navbar.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AppSidenavModule} from './modules/app-sidenav/app-sidenav.module';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './routing/app-routing.module';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {LayoutsModule} from './layouts/layouts.module';
import {DATASETS_CASH} from './pages/datasets-page/cache/datasets';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {UserService} from './services/auth.service';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.G_API_CLIENT_ID,
  discoveryDocs: environment.G_API_DISCOVERY_DOCS,
  ux_mode: 'redirect',
  redirect_uri: environment.G_API_REDIRECT,
  scope: environment.G_API_SCOPE.join(' ')
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    AppNavbarModule,
    MatButtonModule,
    MatIconModule,
    AppSidenavModule,
    GraphQLModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      // tslint:disable-next-line:typedef
      useFactory() {
        return {
          cache: DATASETS_CASH,
        };
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private user: UserService
  ) {
    this.user.auth().subscribe(this.user.setToken);
  }
}
