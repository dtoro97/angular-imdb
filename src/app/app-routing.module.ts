import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorDetailComponent } from './components/actor-detail/actor-detail.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { GenresComponent } from './components/genres/genres.component';
import { HomeComponent } from './components/home/home.component';
import { MovieGenreComponent } from './components/movie-genre/movie-genre.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';

const routes: Routes = [
	{ path: 'genres', component: GenresComponent },
	{ path: 'genres/:id/:name', component: MovieGenreComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'top/:type', component: TopRatedComponent },
	{ path: 'actor/:id', component: ActorDetailComponent, pathMatch: 'full' },
	{ path: ':type/:id', component: DetailViewComponent },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', redirectTo: '/home' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
