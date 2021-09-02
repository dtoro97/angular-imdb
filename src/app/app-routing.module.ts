import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: 'genres', component: GenresComponent},
    { path: 'home', component: HomeComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
