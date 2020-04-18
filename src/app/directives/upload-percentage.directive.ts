import {Directive, ElementRef, HostListener} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Directive({
  selector: '[appUploadPercentage]'
})
export class UploadPercentageDirective {

  constructor(private element: ElementRef) {
  }

  @HostListener('input') onChange() {
    const inputContainerElements = this.getInputContainerElements();
    this.setPercentageCounter(inputContainerElements).subscribe(() => {
      setTimeout(() => {
        inputContainerElements.background.style.width = '0';
        inputContainerElements.percentageText.style.fontSize = '0';
        inputContainerElements.btnText.innerHTML = 'Completed';
        inputContainerElements.btnText.style.fontSize = '16px';
        inputContainerElements.matIcon.style.fontSize = '24px';
      }, 800);
    });
  }

  private getInputContainerElements() {
    const inputElement = this.element.nativeElement as HTMLInputElement;
    const inputContainer = inputElement.closest('.f_file-container') as HTMLElement;
    const button = inputElement.nextElementSibling as HTMLElement;
    return {
      inputElement, inputContainer, button,
      matIcon: button.querySelector('mat-icon') as HTMLElement,
      btnText: button.querySelector('.f_button-text') as HTMLElement,
      background: inputContainer.querySelector('.f_percentage-background') as HTMLElement,
      percentageText: inputContainer.querySelector('.f_percentage-text') as HTMLElement
    };
  }

  setPercentageCounter(inputContainerElements: any) {
    inputContainerElements.btnText.style.fontSize = '0';
    inputContainerElements.matIcon.style.fontSize = '0';
    return new Observable<any>((observer) => {
      let i = 0;

      function setPercentage() {
        inputContainerElements.background.style.width = (i * 1.5) + 'px';
        inputContainerElements.percentageText.innerHTML = i + '%';
        inputContainerElements.percentageText.style.fontSize = '17px';
        i++;
        if (i > 100) {
          observer.next();
          observer.complete();
        } else {
          setTimeout(() => {
            setPercentage();
          }, 15);
        }
      }

      setPercentage();
    });
  }
}
