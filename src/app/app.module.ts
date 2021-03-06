import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './admin/admin.module';
import { SharedNodule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';

import { AuthInterceptor } from './shared/components/auth.interceptor';

import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

const INTERCEPTER_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomepageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedNodule,
    AdminModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [INTERCEPTER_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
