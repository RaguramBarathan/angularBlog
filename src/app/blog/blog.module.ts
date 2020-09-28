import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';


@NgModule({
    declarations: [
        BlogComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        BlogRoutingModule
    ]

})
export class BlogModule {

}