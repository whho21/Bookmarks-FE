import { Router } from "@angular/router";
import { tap } from "rxjs";

export class BorrowBook{
    public bookId: string;
    public userId: string | null;

    constructor(bookId:string) {
        this.bookId = bookId ? bookId : '';
        this.userId = sessionStorage.getItem('thisUser');
        }
}