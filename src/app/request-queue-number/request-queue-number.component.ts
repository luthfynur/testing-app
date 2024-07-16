import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {

  queueNumber: string = ""
  queueDate: string = ""
  barcodeImageSrc: string = ""

  constructor() { }

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

  async ngOnInit(): Promise<void> {
    const response = await axios.post("http://localhost:3000/queue")
    if (response.data.data) {
      this.queueNumber = response.data.data.number
      this.queueDate = this.formatDate(response.data.data.createdAt)
      this.barcodeImageSrc = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${response.data.data._id}&scale=2`;
    }
  }

}
