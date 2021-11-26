import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { 
    path: 'table',
    component: TableComponent
  },
  { 
    path: '', 
    redirectTo: '/table', 
    pathMatch: 'full' 
  },
  {
    path: '**', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
