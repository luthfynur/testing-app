import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import axios from 'axios';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {
  name:string = ""
  phone:string = ""
  address:string = ""
  isLoading:boolean = false
  message:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.message = "";
    this.isLoading = true;
    try {
      await axios.post('http://localhost:3000/visitors', {
        name: this.name,
        address: this.address,
        phone: this.phone
      })
      this.message = "Berhasil menambahkan visitor"
      this.name = ""
      this.address = ""
      this.phone = ""
    } catch(err) {
      this.message = "Gagal menambahkan visitor"
    }
    this.isLoading = false;
  }

}
