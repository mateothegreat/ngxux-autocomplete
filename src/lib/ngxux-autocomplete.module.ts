import { CommonModule }               from '@angular/common';
import { NgModule }                   from '@angular/core';
import { ReactiveFormsModule }        from '@angular/forms';
import { MatAutocompleteModule }      from '@angular/material/autocomplete';
import { MatChipsModule }             from '@angular/material/chips';
import { MatFormFieldModule }         from '@angular/material/form-field';
import { MatIconModule }              from '@angular/material/icon';
import { NgxuxAutocompleteComponent } from './ngxux-autocomplete.component';

@NgModule({

    declarations: [

        NgxuxAutocompleteComponent

    ],

    imports: [

        CommonModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule

    ],

    exports: [

        NgxuxAutocompleteComponent

    ]

})
export class NgxuxAutocompleteModule {}
