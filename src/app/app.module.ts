import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './modules/header/header.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InformeComponent } from './pages/informe/informe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    InformeComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
       HttpClientModule,
       BrowserAnimationsModule,
       MatTableExporterModule,
       MatButtonModule,



  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
