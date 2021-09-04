import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieGenreComponent } from './components/movie-genre/movie-genre.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ShowsComponent } from './components/shows/shows.component';

const routes: Routes = [
    { path: 'genres', component: GenresComponent},
    { path: 'genres/:id/:name', component: MovieGenreComponent },
    { path: 'home', component: HomeComponent},
    { path: 'movies', component: MoviesComponent },
    { path: 'shows', component: ShowsComponent },
    { path: 'movies/:id', component: MovieDetailComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', redirectTo: '/home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
