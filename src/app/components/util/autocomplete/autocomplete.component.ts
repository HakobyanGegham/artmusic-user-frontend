import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less']
})
export class AutocompleteComponent implements OnChanges, OnDestroy {

  @Input() items: any[];
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() addNewText = 'Add New';
  @Input() label: string;

  @Output() createNew = new EventEmitter();
  @Output() optionSelected = new EventEmitter();
  @Output() noSelectedItem = new EventEmitter();

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @ViewChild('autocomplete') autocomplete: MatAutocomplete;

  public filteredItems: Observable<any[]>;
  public noSuggestions = false;
  public query = '';
  private subscription: Subscription;

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.items.currentValue) {
      this.items = changes.items.currentValue;
      this.filteredItems = this.formGroup.get(this.controlName).valueChanges.pipe(
        startWith(''),
        map(val => this.filter(val))
      );

      this.subscription = this.filteredItems.subscribe(item => {
        if (item.length) {
          const isSelected = this.checkIfIsSelected(item);

          if (!isSelected) {
            this.autocompleteInput.nativeElement.value = '';
            this.noSelectedItem.emit();
          }
        }

        this.query = this.autocompleteInput.nativeElement.value;
        this.noSuggestions = !item.length;
      });
    }
  }

  public onCreateNew() {
    this.createNew.emit(this.autocompleteInput.nativeElement.value);
  }

  public optionSelectedEvent(event: MatAutocompleteSelectedEvent) {
    this.query = this.autocompleteInput.nativeElement.value;
    const selectedItem = this.items.find(item => {
      return item.names[this.locale] === event.option.value;
    });

    if (selectedItem) {
      this.optionSelected.emit(selectedItem.id);
    }
  }

  private filter(val: any) {
    return this.items.filter(item => {
      return item.names[this.locale].toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkIfIsSelected(item: any[]) {
    let isSelected = false;
    item.forEach(value => {
      for (const name in value.names) {
        if (!value.names.hasOwnProperty(name)) {
          continue;
        }
        if (value.names[name].includes(this.autocompleteInput.nativeElement.value)) {
          isSelected = true;
        }
      }
    });

    return isSelected;
  }
}
