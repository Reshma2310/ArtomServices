import { Component, OnInit} from '@angular/core';                                                                                                                                                                                                           
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements AfterViewInit, OnInit{
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
    lat = 40.73061;
    lng = -73.935242;
    createForm !: FormGroup;

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     zoom: 8
    };

    constructor(private formBuilder: FormBuilder, private data: DataService, private snackbar: MatSnackBar){}
   
    ngAfterViewInit() {
      this.mapInitializer();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      const marker = new google.maps.Marker({
        position: this.coordinates,
        map: this.map,
        title:"start"
      });
      marker.setMap(this.map);
    }

    ngOnInit() {
      this.createForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        msg: ['', [Validators.required]]
      })
    }
    
    onSubmit() {
      if(this.createForm.valid){
        let input = {
          Name: this.createForm.value.name,
          Email: this.createForm.value.email,
          Message: this.createForm.value.msg
        }
        this.data.addData(input).subscribe((res: any)=> {
          console.log(res);
          this.createForm.reset();
          //this.snackbar.open('We received your question, will get to you soon... Thankyou')
          if (res != null) {
            this.snackbar.open('We received your question, will get back to you soon... Thankyou')
          }
        })
      }
      else {
        console.log("invalid data", this.createForm.value);
      }
    }
}
