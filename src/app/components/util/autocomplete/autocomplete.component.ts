import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less']
})
export class AutocompleteComponent implements OnInit, OnChanges {

  @Input() items: any[];
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() addNewText = 'Add New';
  @Input() label: string;

  @Output() createNew = new EventEmitter();
  @Output() optionSelected = new EventEmitter();

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @ViewChild('autocomplete') autocomplete: MatAutocomplete;

  public filteredItems: Observable<any[]>;
  public noSuggestions = false;
  public query = '';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items.currentValue) {
      this.filteredItems = this.formGroup.get(this.controlName).valueChanges.pipe(
        startWith(''),
        map(val => this.filter(val))
      );

      this.filteredItems.subscribe(item => {
        this.query = this.autocompleteInput.nativeElement.value;
        this.noSuggestions = !item.length;
      });
    }
  }

  ngOnInit(): void {

  }

  public onCreateNew() {
    this.createNew.emit(this.autocompleteInput.nativeElement.value);
  }

  public optionSelectedEvent(event: MatAutocompleteSelectedEvent) {
    this.query = this.autocompleteInput.nativeElement.value;
    const selectedItem = this.items.find(item => {
      return item.name === event.option.value;
    });

    this.optionSelected.emit(selectedItem.id);
  }

  private filter(val: any) {
    return this.items.filter(item => {
      return item.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }
}
