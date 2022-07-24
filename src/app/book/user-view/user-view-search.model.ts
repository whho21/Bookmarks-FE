export class SearchBook {
    public isAvailable: boolean;
    public title: string;
    public author: string;
    public genre: string;
  
    constructor(isAvailable:boolean, title:string, author:string, genre:string) {
    this.isAvailable = isAvailable ? isAvailable : false;
    this.title = title ? title : '';
    this.author = author ? author : '';
    this.genre = genre ? genre : '';
    }
  }