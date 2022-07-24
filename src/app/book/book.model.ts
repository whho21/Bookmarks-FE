import { getLocaleDateTimeFormat } from "@angular/common";
import { User } from "../user/user.model";

export class Book {
    public readonly id: number;
    public title: string;
    public description: string;
    public author: string;
    public genre: string;
    public borrowBy: number;
    public borrowDate: Date;
    public dueDate:Date;
    public status:string;
    public imageSource:string;
    public user : User;

  
    constructor(data: any = {}) {
      this.id = data.id;
      this.title = data.title ? data.title : '';
      this.description = data.description ? data.description : '';
      this.author = data.author ? data.author : '';
      this.genre = data.genre ? data.genre : '';
      this.borrowBy = data.borrowBy ? data.borrowBy : null;
      this.borrowDate = data.borrowDate ? data.borrowDate : null;
      this.dueDate = data.dueDate ? data.dueDate : null;
      this.status = data.status ? data.status : '';
      this.imageSource = data.imageSource ? data.imageSource : '';
      this.user = data.user ? data.user: {};
    }
  }