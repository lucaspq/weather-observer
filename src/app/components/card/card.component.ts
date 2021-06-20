import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  weather: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
