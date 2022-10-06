import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modalService';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  imgUrl = '';
  Author = '';
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ) {
  }
  
  ngOnInit(): void {
    this.imgUrl = this.data.urls.regular
    this.Author = this.data.user.name
  }


  
  close() {
   
  }

}
