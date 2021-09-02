import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { GenresComponent } from './components/genres/genres.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
	declarations: [AppComponent, LoadingComponent, HeaderComponent, HamburgerComponent, GenresComponent, HomeComponent, FooterComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, BrowserAnimationsModule, MatProgressSpinnerModule, CarouselModule],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}],
	bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
