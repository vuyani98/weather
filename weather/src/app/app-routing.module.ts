import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeeklyComponent } from './weekly/weekly.component';
import { CurrentComponent} from './current/current.component';
import { HourlyComponent } from './hourly/hourly.component';
const routes: Routes = [

  { path: 'weekly', component: WeeklyComponent},
  { path: 'hourly', component: HourlyComponent},
  { path: '',       component: CurrentComponent},
  { path: '**',     component: CurrentComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
