import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { UpdateComponent } from './update/update.component';




@NgModule({
    declarations: [
        UpdateComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        YouTubePlayerModule

    ],
    exports: [
        PostRoutingModule

    ]

})
export class PostModule {

}