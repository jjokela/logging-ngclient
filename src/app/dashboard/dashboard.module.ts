import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { FabComponent } from './fab/fab.component';
import { FilterButtonsComponent } from './filter-buttons/filter-buttons.component';
import { HelpComponent } from './help/help.component';
import { LogDetailsComponent } from './log/log-details.component';
import { LogItemComponent } from './log/log-item.component';
import { NewLogItemComponent } from './log/new-log-item.component';

import { ConnectionResolver } from './dashboard.route.resolver';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { LogApiService } from './services/log-api.service';
import { SeedService } from './services/seed.service';

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
        DashboardComponent,
        FabComponent,
        FilterButtonsComponent,
        HelpComponent,
        LogDetailsComponent,
        LogItemComponent,
        NewLogItemComponent,
        MomentPipe
    ],
    providers: [ SeedService, LogApiService, ConnectionResolver ],
    entryComponents: [ LogDetailsComponent, NewLogItemComponent, HelpComponent ]
})
export class DashboardModule { }
