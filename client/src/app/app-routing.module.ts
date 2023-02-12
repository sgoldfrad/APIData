import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidanceComponent } from './guidance/guidance.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';


const routes: Routes = [
  {path: "", component:GuidanceComponent},
  {path: "details", component:PersonalDetailsComponent},
  {path:"guidance",component:GuidanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
