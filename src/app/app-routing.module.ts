import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NewReplyComponent } from './new-reply/new-reply.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: "posts/search", component: SearchResultComponent, canActivate: [AuthGuard] },
  { path: "posts/reply/:id", component: NewReplyComponent, canActivate: [AuthGuard] },
  { path: "posts/:id", component: PostDetailsComponent, canActivate: [AuthGuard] },
  { path: "myPost", component: PostListComponent, canActivate: [AuthGuard] },
  { path: "newPost", component: NewPostComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "**", redirectTo: "welcome", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
