import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router'; 


const appRoutes : Routes = [
    { path: "", redirectTo: "/blogs", pathMatch: "full" },
    // Main blogs Page
    { path : "blogs" , loadChildren: ()=>  import("./blog/blog.module").then(m => m.BlogModule ) },
    //Post Page
    { path : "post"  , loadChildren: ()=>  import("./post/post.module").then(m => m.PostModule ) },
    //auth
    { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)  },
    { path: "**", redirectTo: "/blogs"},
    
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {

}