import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { UserViewComponent } from './book/user-view/user-view.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { User } from './user/user.model';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserViewDetailsComponent } from './book/user-view/user-view-details/user-view-details.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { CreateBookComponent } from './book/create-book/create-book.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { UserBorrowDetailsComponent } from './book/user-view/user-borrow-details/user-borrow-details.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent,
    data:{ title: 'Login'}
  },
  {
    path:'books',
    component:UserViewComponent,
    data:{ title: 'All Books'}
  },
  {
    path:'books/details/:bid',
    component:UserViewDetailsComponent,
    data:{ title: ':bname'}
  },
  {
    path:'books/borrowedbooks',
    component:UserBorrowDetailsComponent,
    data:{ title: 'My Borrowed Books'}
  },
  {
    path:'admin/users',
    component:UserComponent,
    data:{ title: 'Manage Users'}
  },
  {
    path:'admin/users/details/:uid',
    component:UserDetailsComponent,
    data:{ title: 'User :uid'}
  },
  {
    path:'admin/users/add',
    component:CreateUserComponent,
    data:{ title: 'Add User'}
  },
  {
    path:'admin/users/update/:uid',
    component:UpdateUserComponent,
    data:{ title: 'Update User'}
  },
  {
    path:'admin/books',
    component:BookComponent,
    data:{ title: 'Manage Books'}
  },
  {
    path:'admin/books/details/:bid',
    component:BookDetailsComponent,
    data:{ title: 'Book :bid'}
  },
  {
    path:'admin/books/add',
    component:CreateBookComponent,
    data:{ title: 'Create new book'}
  },
  {
    path:'admin/books/update/:bid',
    component:UpdateBookComponent,
    data:{ title: 'Update book'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
