import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { SearchBook } from './user-view-search.model';

@Component({
  selector: 'app-user-view',
  templateUrl: 'user-view.component.html',
  styleUrls: ['user-view.component.css']
})
export class UserViewComponent implements OnInit {

  books: any = [];

  form: FormGroup = new FormGroup({
    available: new FormControl(),
    author: new FormControl(),
    title: new FormControl(),
    genre: new FormControl()
  });
  constructor(public bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      this.getBooks();
      console.log(this.getBooks);
    } else if (checkAdmin == 'false') {
      this.getBooks();
      console.log(this.getBooks);
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
    

  }
  getBooks() {
    this.books = [];
    this.bookService.getBooks().subscribe((data: {}) => {
      console.log(data);
      this.books = data;
    });
  }

  searchBooks() {
    let search: SearchBook = new SearchBook(
      this.form.get('available')?.value,
      this.form.get('title')?.value,
      this.form.get('author')?.value,
      this.form.get('genre')?.value
    );

    console.log("Search data: " + search);
    this.bookService.searchBook(search).subscribe((data: {}) => {
      console.log(data);
      this.books = data;
    });
  }

  checkValue(event: any) {
    console.log(event);
  }
  logout() {
    sessionStorage.clear();
  }
}