import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReducerComponent } from './reducer/reducer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapComponent } from './map/map.component';
import { OpenComponent } from './open/open.component';

const routes: Routes = [


  /*Shopping List*/
  /*Mobile*/
  {path: '', component:ReducerComponent},
  {path: 'homepage',component: HomepageComponent},
  {path: 'map',component: MapComponent},
  {path: 'open', component:OpenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
