import { Component, OnInit } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
 isLoading: boolean = false;
 visitors: {name:string, phone:string, address:string}[] = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const visitors = await axios.get('http://localhost:3000/visitors')
    if (visitors.data.data) {
      this.visitors = visitors.data.data;
    }
    console.log(this.visitors);
    this.isLoading = false;
  }

  async search(keyword: string): Promise<void> {
    this.isLoading = true;
    let visitors:AxiosResponse;

    if (keyword.length <= 0) {
      visitors = await axios.get('http://localhost:3000/visitors')
    } else {
      visitors = await axios.get(`http://localhost:3000/visitors?name=${keyword}&phone=${keyword}&address=${keyword}`)
    }
    
    if (visitors.data.data) {
      this.visitors = visitors.data.data;
    }
    this.isLoading = false;
  }

   formatDate(utcDateTimeString: string): string {
    const utcDateTime = new Date(utcDateTimeString); 
    const utc7DateTime = new Date(utcDateTime.getTime() + (7 * 60 * 60 * 1000));
  
    const day = utc7DateTime.getUTCDate().toString().padStart(2, '0');
    const month = (utc7DateTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = utc7DateTime.getUTCFullYear();
    const hours = utc7DateTime.getUTCHours().toString().padStart(2, '0');
    const minutes = utc7DateTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = utc7DateTime.getUTCSeconds().toString().padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

}
