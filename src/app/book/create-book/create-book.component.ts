import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.services';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewBook } from './create-book.model';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  title: string = "";
  author:string = "";
  img: string= "";
  description:string = "";
  genre:string = "";

  //book = new Book //need constructor for book.
  constructor(public bookservice: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      
    } else if (checkAdmin == 'false') {
      this.router.navigate(['/books'])
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
  }

  create(){
    let bookData : NewBook = new NewBook(this.title, this.author, this.img.split("\\").pop(), this.description, this.genre);
    this
      .bookservice
      .addBook(bookData)
      .subscribe({
        next: async (result) =>  {
          await this.router.navigate(['admin/books/details/' + result.id]);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  viewFile(){
    let fileName : any = this.img.split("\\").pop();
    alert("File name is \n" + fileName);
  }
  logout(){
    sessionStorage.clear;
  }

}
