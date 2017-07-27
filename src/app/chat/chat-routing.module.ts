import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ConnectionResolver } from './chat.route.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'chat', component: ChatComponent, resolve: { connection: ConnectionResolver } }
    ])
  ],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
