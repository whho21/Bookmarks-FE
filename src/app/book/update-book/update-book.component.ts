import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.services';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { UpdateBook } from './update-book.model';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  book: Book = new Book;

  title: string = "";
  description: string = "";
  author: string = "";
  imageSource: any = "";
  genre: string = "";
  status: string = "";


  // bookData: UpdateBook = {
  //   title: this.book.title,
  //   author: this.book.author,
  //   description: this.book.description,
  //   imageSource: this.book.imageSource,
  //   status: this.book.status,
  //   genre: this.book.status
  //   // borrowDate: '',
  //   // dueDate: '',
  //   // userId:''
  // };

  constructor(public bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      console.log("Testing book Id from route");
    console.log(this.route.snapshot.params['bid']);
    this.bookService.getBookById(this.route.snapshot.params['bid']).subscribe((data: Book) => {
      this.book = data;
      this.title = this.book.title;
      this.description = this.book.description;
      this.author = this.book.author;
      this.imageSource = this.book.imageSource;
      this.genre = this.book.genre;
      this.status = this.book.status;
      console.log("Copied From Backend");
      console.log(this.book);
    });
    } else if (checkAdmin == 'false') {
      this.router.navigate(['/books'])
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
    
    
  }

  updateBook() {
    // console.log(this.bookData);

    let updatedUser: UpdateBook = new UpdateBook(
      this.title,
      this.description,
      this.author,
      this.imageSource.split("\\").pop(),
      this.genre,
      this.status
    );

    console.log(updatedUser);
    if (confirm("Are you sure you want to update?")) {
      this.bookService.updateBook(this.route.snapshot.params['bid'], updatedUser)
        .subscribe((updatedData: Book) => {
          console.log(updatedData);
          this.book = updatedData;
          console.log("Updated book data");
          console.log(this.book);
        });
    }
  }

  logout() {
    sessionStorage.clear;
  }
}
