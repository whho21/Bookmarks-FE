import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.services';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowBook } from './borrow-book.model';
import { Book } from '../../book.model';

@Component({
  selector: 'app-user-view-detail',
  templateUrl: './user-view-details.component.html',
  styleUrls: ['./user-view-details.component.css']
})
export class UserViewDetailsComponent implements OnInit {
  book: Book = new Book;

  constructor(public bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      this.bookService.getBookById(this.route.snapshot.params['bid']).subscribe((data: Book) => {
        console.log(data);
        this.book = data;
      });
    } else if (checkAdmin == 'false') {
      this.bookService.getBookById(this.route.snapshot.params['bid']).subscribe((data: Book) => {
        console.log(data);
        this.book = data;
      });
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
    
    
  }
  borrow(bookId: any) {
    let borrowBook: BorrowBook = new BorrowBook(bookId);
    if (confirm("Confirm borrowing of book?")) {
      this.bookService.borrowBook(borrowBook).subscribe((data: Book) => {
        console.log(borrowBook);
        console.log(data);
        this.book = data;
      })
    } else {
      alert("Borrowing of book cancelled!");
    }
  }

  toggleShow() {
    let buttonShow: boolean;
    if (this.book.status == "Available") {
      buttonShow = false;
    } else {
      buttonShow = true;
    }
    return buttonShow;
  }

  logout() {
    sessionStorage.clear;
  }

}
