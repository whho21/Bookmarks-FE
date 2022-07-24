import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from './book.model'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BorrowBook } from './user-view/user-view-details/borrow-book.model';
import { SearchBook } from './user-view/user-view-search.model';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

const endpoint = "http://localhost:8084/bookmarks/books/";


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  // create the get all books http get function here
  getBooks(): Observable<Book[]> {
    //TODO: get books
    return this.http.get<Book[]>(endpoint + 'all/').pipe(
      catchError(this.handleError<any>('getBooks'))
    );
  }
  // create the get book by id  http get function here
  getBookById(id: any): Observable<Book> {
    //TODO: get book by ID
    return this.http.get<Book>(endpoint + id).pipe(
      catchError(this.handleError<any>('getBookById'))
    );
  }
  addBook(book: any): Observable<Book> {
    console.log(book);
    return this.http.post<Book>(endpoint + 'add/', JSON.stringify(book), httpOptions).pipe(
      tap((bookItem) => console.log(`added book w/ id=${bookItem.id}`)),
      catchError(this.handleError<any>('addBook'))
    );
  }

  updateBook(id: any, book: any): Observable<Book> {
    return this.http.put<Book>(endpoint + 'update/' + id, JSON.stringify(book), httpOptions).pipe(
      tap(bookItem => console.log(`updated book id=${bookItem.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  deleteBook(id: any): Observable<any> {
    return this.http.delete<any>(endpoint + 'delete/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted book id=${id}`)),
      catchError(this.handleError<any>('deleteBook'))
    );
  }

  searchBook(book: SearchBook): Observable<Book[]> {
    return this.http.post<Book[]>(endpoint + 'search', JSON.stringify(book), httpOptions).pipe(
      catchError(this.handleError<any>('searchBook'))
    );
  }

  borrowBook(book: BorrowBook): Observable<Book> {
    return this.http.put<Book>(endpoint + 'borrow/', JSON.stringify(book), httpOptions).pipe(
      tap(borrowedBook => console.log('borrowed book id=' + borrowedBook.id)),
      catchError(this.handleError<any>('borrowBook'))
    );
  }

  returnBook(id: any): Observable<Book> {
    return this.http.put<Book>(endpoint + 'return/' + id, httpOptions).pipe(
      tap(returnedBook => console.log('borrowed book id=' + returnedBook.id)),
      catchError(this.handleError<any>('returnBook'))
    );
  }

  getBooksByUser(uid: any): Observable<Book> {
    return this.http.get<Book>(endpoint + 'borrowedbooks/' + uid).pipe(
      catchError(this.handleError<any>('getBooksByUser'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for book consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
