import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../book.model';
import { BookService } from '../../book.services';

@Component({
  selector: 'app-user-borrow-details',
  templateUrl: './user-borrow-details.component.html',
  styleUrls: ['./user-borrow-details.component.css']
})
export class UserBorrowDetailsComponent implements OnInit {

  books: any = [];

  constructor(public bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      let userid: string | null = sessionStorage.getItem('thisUser');
      this.getBooksBorrowed(userid);
      console.log(this.getBooksBorrowed);
    } else if (checkAdmin == 'false') {
      let userid: string | null = sessionStorage.getItem('thisUser');
      this.getBooksBorrowed(userid);
      console.log(this.getBooksBorrowed);
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }

   

  }
  getBooksBorrowed(uid: string | null) {
    this.books = [];
    this.bookService.getBooksByUser(uid).subscribe((data: {}) => {
      console.log(data);
      this.books = data;
    });
  }
  logout() {
    sessionStorage.clear;
  }

}
