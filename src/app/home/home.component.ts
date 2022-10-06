import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ModalService } from '../services/modalService';

const defaultDialogConfig = new MatDialogConfig();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Search: any = [];
  page: number = 1;
  searchPage: number = 1;
  sizeImg: string = '&fit=crop&w=500&h=500'
  searchKeyword = '';
  key = "q-eSEI0aLGiUsOaxLnxcKEdinAWkCz5kpCp09maVfB4";
  

  constructor(public imageService: ImagesService, private http: HttpClient,public dialog: MatDialog,private modalService: ModalService) {
    this.imageService.getDeaultTopicImages();
    this.imageService.getTopics();
   }

  ngOnInit(): void {
    this.imageService.getDefaultImages().subscribe((data) => {
      if(data != null)
      {
        this.Search = data
        console.log(data)
      }

    })
  }

  openDialog(image:any) {
    const config = {
      data: image
    }
    console.log(image)
    const dialogRef = this.dialog.open(ImageDialogComponent , config);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  searchTopics(topic:string){
    this.imageService.SearchTopicImages(topic)
    .subscribe((res) =>  {
      if (res.length == 0) {
        this.Search = [];
        //this.router.navigate(['not-found']);
      } else {
        this.Search = res
        //this.searchLength = this.Search.length;
        console.log(res);
        //console.log(this.searchLength);
      }
    });
  }

  searchImage(searchPage: number) {

    this.imageService.SearchForImages(searchPage , this.searchKeyword)
    .subscribe((res) =>  {
      if (res.total == 0) {
        this.Search = [];
        //this.router.navigate(['not-found']);
      } else {
        this.Search = res['results'];
        //this.searchLength = this.Search.length;
        console.log(res);
        //console.log(this.searchLength);
      }

      this.Search.map((item: { created_at: string | number | Date; }) => { 
        item.created_at = new Date(item.created_at).toLocaleDateString('pt-BR');
      });
    });

  }
  

}
