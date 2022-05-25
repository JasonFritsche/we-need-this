import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ContainerComponent } from './components/container/container.component';
import { FieldValidationIndicatorComponent } from './components/field-validation-indicator/field-validation-indicator.component';

@NgModule({
  declarations: [ContainerComponent, FieldValidationIndicatorComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ContainerComponent, FieldValidationIndicatorComponent],
})
export class SharedModule {}
