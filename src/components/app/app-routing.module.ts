import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateComponent} from "../create/create.component";
import {IndexComponent} from "../index/index.component";
import {AboutYouComponent} from "../about-you/about-you.component";
import {VehicleComponent} from "../vehicles/vehicles.component";

const routes: Routes = [
  {path: 'create-quote', component: CreateComponent},
  {path: 'index', component: IndexComponent},
  {path: 'aboutYou/:state/:zipCode', component: AboutYouComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
