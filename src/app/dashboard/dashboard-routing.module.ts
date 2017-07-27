import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ConnectionResolver } from './dashboard.route.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardComponent, resolve: { connection: ConnectionResolver } }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

