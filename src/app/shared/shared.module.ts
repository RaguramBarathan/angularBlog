import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [CommonModule],
    exports: [
        //export all these because we wil use this in other modules
        AlertComponent,
        LoadingSpinnerComponent,
        CommonModule
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule { }
