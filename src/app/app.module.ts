import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { UserViewComponent } from './book/user-view/user-view.component';
import { UserViewDetailsComponent } from './book/user-view/user-view-details/user-view-details.component';
import { CreateBookComponent } from './book/create-book/create-book.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserBorrowDetailsComponent } from './book/user-view/user-borrow-details/user-borrow-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BookComponent,
    LoginComponent,
    UserDetailsComponent,
    BookDetailsComponent,
    UserViewComponent,
    UserViewDetailsComponent,
    CreateBookComponent,
    CreateUserComponent,
    UpdateBookComponent,
    UpdateUserComponent,
    UserBorrowDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
