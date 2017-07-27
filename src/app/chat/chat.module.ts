
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConnectionResolver } from './chat.route.resolver';

@NgModule({
  imports: [CommonModule, FormsModule, ChatRoutingModule],
  declarations: [ChatComponent],
  exports: [ChatComponent],
  providers: [ConnectionResolver]
})
export class ChatModule { }