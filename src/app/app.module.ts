import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { ChatModule } from './chat/chat.module';

import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';
import { MdlModule } from '@angular-mdl/core';
import { MdlPopoverModule } from '@angular-mdl/popover';
import { MdlFabMenuModule } from './fab-menu/fab-menu';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import 'hammerjs';
declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'logHub';
  c.url = 'http://loggingweb2.azurewebsites.net';
  c.logging = true;
  return c;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MdlModule,
    MdlPopoverModule,
    MdlFabMenuModule,
    ChatModule,
    DashboardModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    SignalRModule.forRoot(createConfig)
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
