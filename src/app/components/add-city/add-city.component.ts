import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { map, startWith } from 'rxjs/operators';
import { ObservedCity } from 'src/app/models/observed-city';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent {

  cityList = require('../../../assets/city.list.json');

  private options: any[] = [];
  public cityName = new FormControl();
  public filteredOptions: string[];
  public height: string;


  @ViewChild('startPicker') pickerStart;
  @ViewChild('endPicker') pickerEnd;

  // DAY = 86400000;
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
    private userService: UserService,
    private weatherService: WeatherService,
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

  }


  ngOnInit(): void {

    this.options = this.cityList;

    // Listen for changes to the input
    this.cityName.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          // Filter the options
          this.filteredOptions = this.options.filter(option => option.name.toLowerCase().startsWith(value.toLowerCase()));

          // Recompute how big the viewport should be.
          if (this.filteredOptions.length < 4) {
            this.height = (this.filteredOptions.length * 25) + 'px';
          } else {
            this.height = '200px'
          }
        })
      ).subscribe();
  }

  onSubmit() {
    const city = this.cityName.value;
    const startDateTime = new Date(this.form.controls.start.value);
    const endDateTime = new Date(this.form.controls.end.value);
    const observedCity = new ObservedCity(city, startDateTime, endDateTime);

    this.userService.AddObservedCity(this.userService.loggedUser, observedCity)
    .subscribe( () => {
      console.log('ObservedCity:', observedCity);
      alert(`The city ${observedCity.city} is under observation!`);
    }, (err) => {
      console.log(err);
    });
  }

}
