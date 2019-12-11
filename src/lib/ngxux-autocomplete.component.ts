import { COMMA, ENTER }                                  from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild }       from '@angular/core';
import { FormControl }                                   from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent }                             from '@angular/material/chips';
import { Observable }                                    from 'rxjs';
import { map, startWith }                                from 'rxjs/operators';
import { NgxuxAutocompleteItem }                         from './ngxux-autocomplete-item';

@Component({

    selector: 'ngxux-autocomplete',
    template: `

        <div class="wrapper">

            <mat-form-field>

                <mat-chip-list #chipList>

                    <mat-chip *ngFor="let item of selected"
                              [selectable]="selectable"
                              [removable]="removable"
                              (removed)="remove(item)">

                        {{ item.label }}

                        <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>

                    </mat-chip>

                    <input [placeholder]="placeholder"
                           #input
                           [formControl]="control"
                           [matAutocomplete]="auto"
                           [matChipInputFor]="chipList"
                           [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                           [matChipInputAddOnBlur]="addOnBlur"
                           (matChipInputTokenEnd)="add($event)">

                </mat-chip-list>

                <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onSelection($event)">

                    <mat-option *ngFor="let item of filtered | async" [value]="item">

                        {{ item.label }}

                    </mat-option>

                </mat-autocomplete>

            </mat-form-field>

        </div>

    `,
    styleUrls: [ './ngxux-autocomplete.component.scss' ]
})
export class NgxuxAutocompleteComponent {

    @Input() public items: Array<NgxuxAutocompleteItem> = [ { label: 'a' }, { label: 'b' } ];
    @Input() public placeholder: string = 'Select..';

    public selected: Array<NgxuxAutocompleteItem> = [];
    public visible = true;
    public selectable = true;
    public removable = true;
    public addOnBlur = true;
    public separatorKeysCodes: number[] = [ ENTER, COMMA ];
    public control = new FormControl();
    public filtered: Observable<Array<NgxuxAutocompleteItem>>;

    // @ts-ignore
    @ViewChild('input', { static: false }) public input: ElementRef<HTMLInputElement>;
    // @ts-ignore
    @ViewChild('auto', { static: false }) public matAutocomplete: MatAutocomplete;

    public constructor() {

        // this.filtered = this.control.valueChanges.pipe(startWith(null), map((fruit: string | null) => fruit ? this._filter(fruit) : this.items.slice()));
        this.filtered = this.control.valueChanges.pipe(startWith(null), map((item: NgxuxAutocompleteItem | null) => item ? this._filter(item) : this.items.slice()));

    }

    public add(event: MatChipInputEvent): void {

        //
        // Item was typed in manually.
        //
        if (!this.matAutocomplete.isOpen) {

            if (event.value.length > 0) {

                console.log(event);

                //
                // Check to see if the manually typed in value already exists as a label.
                //
                const potentialItem = this.items.find(item => item.label == event.value);
                console.log(potentialItem);

                //
                // If a matching label was found then we add that as the value otherwise
                // we add a new NgxuxAutocompleteItem to the items array.
                //
                if (potentialItem) {

                    console.log(this.selected.indexOf(potentialItem));

                    if (this.selected.indexOf(potentialItem) === -1) {

                        this.selected.push(potentialItem);

                    }

                } else {

                    //
                    // Prevent duplicates.
                    //
                    const alreadyExists = this.selected.find(item => item.label == event.value);

                    if (!alreadyExists) {

                        this.selected.push({ label: event.value });

                    }

                }

                event.input.value = '';
                this.control.setValue(null);

                event.input.blur();

            }

        }

    }

    /**
     * Triggered by clicking on the mat-icon close or backspace.
     *
     * @param {NgxuxAutocompleteItem} item
     */
    public remove(item: NgxuxAutocompleteItem): void {

        const index = this.selected.indexOf(item);

        if (index >= 0) {

            this.selected.splice(index, 1);

        }

    }

    /**
     * Handle when a chip is selected (not to be confused with entering a value by typing).
     *
     * @param {MatAutocompleteSelectedEvent} event
     */
    public onSelection(event: MatAutocompleteSelectedEvent): void {

        // @ts-ignore
        this.selected.push(event.option.value);
        this.input.nativeElement.value = '';
        this.control.setValue(null);

    }

    /**
     *
     * @param {NgxuxAutocompleteItem} value
     * @returns {Array<NgxuxAutocompleteItem>}
     * @private
     */
    private _filter(value: NgxuxAutocompleteItem): Array<NgxuxAutocompleteItem> {

        // console.log(value);

        if (value.label) {

            const filterValue = value.label.toLowerCase();
            return this.items.filter(item => item.label.toLowerCase().indexOf(filterValue) === 0);

        }


    }

}
