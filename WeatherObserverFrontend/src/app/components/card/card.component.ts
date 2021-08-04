import { Component, Input, OnInit } from '@angular/core';
import { ObservedCity } from 'src/app/models/observed-city';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  weather: ObservedCity;

  constructor() { }

  ngOnInit(): void {  }

}
