import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';


import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';

//import { BlogService } from './blog/blog.service';
import { PostComponent } from './post/post.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AuthModule }from './auth/auth.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BlogModule,
    PostModule,
    YouTubePlayerModule,
    AuthModule,
    //db
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
