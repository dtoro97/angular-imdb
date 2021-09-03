import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ShowsComponent } from './components/shows/shows.component';

const routes: Routes = [
    { path: 'genres', component: GenresComponent},
    { path: 'home', component: HomeComponent},
    { path: 'movies', component: MoviesComponent },
    { path: 'shows', component: ShowsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
