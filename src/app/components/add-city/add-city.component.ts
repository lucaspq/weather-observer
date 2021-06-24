import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
// import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent {

  cityList = require('./city.list.json');
  cityNameList = [];
  cityKey = '';
  searchText = '';
  cities = ['Fortaleza', 'Sao Paulo', 'New York', 'Colorado'];


  @ViewChild('startPicker') pickerStart;
  @ViewChild('endPicker') pickerEnd;

  DAY = 86400000;
  // minDate: new Date(Date.now() + (this.DAY*29)),

  startOptions: FlatpickrOptions = {
    "enableTime": true,
    mode: 'single',
    dateFormat: 'd/m/Y - H:i',
    defaultDate: new Date(),
    minDate: new Date()
  };

  endOptions: FlatpickrOptions = {
    "enableTime":true,
    mode: 'single',
    dateFormat: 'd/m/Y - H:i',
    defaultDate: new Date(),
    minDate: new Date()
  };

  form: FormGroup;

  constructor( 
    private formBuilder: FormBuilder
    ) {
      this.form = formBuilder.group({
        cityName: '',
        start: new Date(),
        end: new Date()
      });

      // Start Date Changes
      this.form.controls.start.valueChanges.subscribe(changes => {
        if (!changes[0]) return;
        const selectedDate = changes[0].getTime();
        this.pickerEnd.flatpickr.set({
          minDate: new Date(selectedDate)
        });
      });

      // End Date Changes
      this.form.controls.end.valueChanges.subscribe(changes => {
        if (!changes[0]) return;
        const selectedDate = changes[0].getTime();
        this.pickerStart.flatpickr.set({
          maxDate: new Date(selectedDate)
        });
      });

      this.cityNameList = this.cityList.map( (d: any) => d.name);

    }

  ngOnInit(): void {

  }

  onSubmit() {
    alert(`City ${this.form.controls.cityName.value} added with success between ${this.form.controls.start.value} e ${this.form.controls.end.value} !`);
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }

}
