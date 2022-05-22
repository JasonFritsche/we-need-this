import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor() {}

  @Input() containerStyle: Record<string, string> = {
    // pass in styles from parent
  };

  ngOnInit(): void {}
}
