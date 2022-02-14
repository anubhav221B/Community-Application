import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './Service/token-interceptor.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { NewReplyComponent } from './new-reply/new-reply.component';
import { PostComponent } from './post/post.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    MustMatchDirective,
    NewPostComponent,
    PostListComponent,
    PostDetailsComponent,
    NewReplyComponent,
    PostComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
