import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRestrictInput]',
  standalone: true
})
export class RestrictInputDirective {

  @Input() appRestrictInput: 'number' | 'alphabet' | 'alphanumeric' = 'alphanumeric';

  constructor() { }

  private getPattern(): RegExp {
    switch (this.appRestrictInput) {
      case 'number':
        return /^[0-9]+$/;

      case 'alphabet':
        return /^[a-zA-Z\s]+$/;

      default:
        return /^[a-zA-Z0-9]+$/;
    }
  }

  
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const pattern = this.getPattern();

    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }


  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') ?? '';

    if (!this.getPattern().test(pastedText)) {
      event.preventDefault();
    }
  }

}
