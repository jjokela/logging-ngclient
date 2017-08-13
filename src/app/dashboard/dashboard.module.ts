import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { FabComponent } from './fab/fab.component';
import { FilterButtonsComponent } from './filter-buttons/filter-buttons.component';
import { ResetComponent } from './reset/reset.component';
import { AboutComponent } from './about/about.component';
import { LogDetailsComponent } from './log/log-details.component';
import { LogItemComponent } from './log/log-item.component';
import { NewLogItemComponent } from './log/new-log-item.component';

import { ConnectionResolver } from './dashboard.route.resolver';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { LogApiService } from './services/log-api.service';

import { MdlModule } from '@angular-mdl/core';
import { MdlPopoverModule } from '@angular-mdl/popover';
import { MdlFabMenuModule } from '../fab-menu/fab-menu';

import { ReactiveFormsModule } from '@angular/forms';

import { MomentPipe } from './log/moment.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardRoutingModule,
        MdlModule,
        MdlPopoverModule,
        MdlFabMenuModule,
        ReactiveFormsModule ],
    exports: [ DashboardComponent ],
    declarations: [
        AboutComponent,
        DashboardComponent,
        FabComponent,
        FilterButtonsComponent,
        ResetComponent,
        LogDetailsComponent,
        LogItemComponent,
        NewLogItemComponent,
        MomentPipe
    ],
    providers: [ LogApiService, ConnectionResolver ],
    entryComponents: [ LogDetailsComponent, NewLogItemComponent, ResetComponent, AboutComponent ]
})
export class DashboardModule { }
