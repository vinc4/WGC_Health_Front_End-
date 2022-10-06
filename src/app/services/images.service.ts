import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  key = "q-eSEI0aLGiUsOaxLnxcKEdinAWkCz5kpCp09maVfB4";
  images: any = [];
  topics: any = [];
  page: number = 1;
  Default_per_page : number = 100;
  
  constructor(private http:HttpClient) { }

  DefaultTopicImages: BehaviorSubject<any> = new BehaviorSubject<any>(null)


  getDeaultTopicImages(){
    return this.http.get(`https://api.unsplash.com/topics/nature/photos?client_id=${this.key}&per_page=${this.Default_per_page}`)
    .subscribe((data) => this.DefaultTopicImages.next(data))
  }

  SearchForImages(searchPage: number , searchKeyword:string){
    return this.http.get<any>(`https://api.unsplash.com/search/photos?client_id=${this.key}&page=${searchPage}&per_page=24&query=${searchKeyword}`)
  }

  SearchTopicImages(topic: string){
    return this.http.get<any>(`https://api.unsplash.com/topics/${topic}/photos?client_id=${this.key}&per_page=${this.Default_per_page}`)
  }

 getDefaultImages() {
    return this.DefaultTopicImages.asObservable();
}



  getTopics(){
    return this.http.get(`https://api.unsplash.com/topics?client_id=${this.key}`)
    .subscribe((Defaultopics: any) => {
      console.log(Defaultopics)
    });
  }

  getImages(page : number){
    return this.http.get(`https://api.unsplash.com/photos?per_page=24&page=${page}&order_by=latest&client_id=${this.key}`)
    .subscribe((cards: any) => {
      this.images = cards;
      console.log(cards)


      cards.map((item: { created_at: string | number | Date; }) => {
        item.created_at = new Date(item.created_at).toLocaleDateString(
          'pt-BR');
      });
    });
  }


  getItem(id:string) {
    return this.http.get(`https://api.unsplash.com/photos/${id}?client_id=${this.key}`)
  }

}



