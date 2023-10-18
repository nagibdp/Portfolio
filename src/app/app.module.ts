import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgOptimizedImage } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProyectsComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [provideRouter(routes, withComponentInputBinding())],
  bootstrap: [AppComponent]
})
export class AppModule { }
