import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { PostComponent } from './post.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from '../auth/auth.guard';
const blogRoutes: Routes = [
    
    
    { path: 'write',component: UpdateComponent ,  canActivate: [AuthGuard] },
    { path: 'read/:id',component: PostComponent ,},
    { path: 'edit/:id',component: UpdateComponent , canActivate: [AuthGuard] },
    { path: ':id',component: PostComponent , pathMatch:"full"}

];

@NgModule({
    imports: [
        RouterModule.forChild(blogRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PostRoutingModule {

}