import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-field-validation-indicator',
  templateUrl: './field-validation-indicator.component.html',
  styleUrls: ['./field-validation-indicator.component.scss'],
})
export class FieldValidationIndicatorComponent implements OnInit {
  constructor() {}

  @Input() isValid!: boolean;
  public statusIcon = 'alert-circle';

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['isValid']?.currentValue) {
      console.log(this.isValid);
    }
  }
}
