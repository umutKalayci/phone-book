import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CallsComponent } from './pages/calls/calls.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { MatCardHeaderComponent } from './components/mat-card-header/mat-card-header.component';
import { CallDialogComponent } from './components/call-dialog/call-dialog.component';
import { CallButtonComponent } from './components/call-button/call-button.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CompaniesInputComponent } from './components/companies-input/companies-input.component';

import { FloorPipePipe } from './floor-pipe.pipe';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
const appRoute: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contacts/:id', component: ContactsComponent },
  { path: 'calls', component: CallsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/:id', component: CompaniesComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactsComponent,
    CallsComponent,
    CompaniesComponent,
    MatCardHeaderComponent,
    CallDialogComponent,
    CallButtonComponent,
    FloorPipePipe,
    ItemListComponent,
    CompaniesInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
