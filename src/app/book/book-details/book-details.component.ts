import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book;

  constructor(public bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      this.bookService.getBookById(this.route.snapshot.params['bid'])
    .subscribe((data: Book) => {
      console.log(data);
      this.book = data;
    });
    } else if (checkAdmin == 'false') {
      this.router.navigate(['/books'])
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
    
  }

  returnBook(){
    this.bookService.returnBook(this.book.id)
    .subscribe((data: Book) => {
      console.log("Book returned! Book ID: " + data.id + " - Book Status: " + data.status);
      console.log(data);
      this.router.navigate(['admin/books/']);
    })
  }

  backPage() {
    this.router.navigate(['admin/books']);
  }

  toggleShow(){
    let buttonShow : boolean;
    if(this.book.status !== "Available") {
      buttonShow = false;
    } else {
      buttonShow = true;
    }
    return buttonShow;
  }
  logout(){
    sessionStorage.clear;
  }
}