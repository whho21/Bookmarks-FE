import { Component, OnInit } from '@angular/core';
import { BookService } from '../book/book.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any = [];

  constructor(public bookservice: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      this.getBooks();
    console.log(this.getBooks);
    } else if (checkAdmin == 'false') {
      this.router.navigate(['/books'])
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
    
    
  }
  getBooks() {
    this.books = [];
    this.bookservice.getBooks().subscribe((data: {}) => {
      console.log(data);
      this.books = data;
    });
  }

  async add() {
    await this.router.navigate(['/product-add']);
  }
  async view(id:any) {
    await this.router.navigate(['/book/id']);
  }

  delete(id:any,title:any) {
    if (confirm("Are you sure you want to delete " + title)) {
      this.bookservice.deleteBook(id)
        .subscribe({
          next: res => {
            this.getBooks();
          }, error: (err) => {
            console.log(err);
          }
        });
    } else {
      alert("Deletion of " + title + " cancelled");
    }};
    logout(){
      sessionStorage.clear;
    }
}
