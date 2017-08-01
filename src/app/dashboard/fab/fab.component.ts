import { Component, OnInit } from '@angular/core';
import { MdlModule } from '@angular-mdl/core';
import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { NewLogItemComponent, TEST_VALUE } from '../log/new-log-item.component';
import { HelpComponent } from '../help/help.component';

@Component({
    selector: 'app-fab',
    templateUrl: 'fab.component.html',
    styleUrls: ['fab.component.css']
})

export class FabComponent implements OnInit {
    constructor(private dialogService: MdlDialogService,
        private snackbarService: MdlSnackbarService) { }

    ngOnInit() { }

    alert(msg: string) {
        console.log(msg);
    }

    public createLogMessage($event: MouseEvent) {
        const pDialog = this.dialogService.showCustomDialog({
            component: NewLogItemComponent,
            providers: [{ provide: TEST_VALUE, useValue: 'Just an example' }],
            isModal: true,
            styles: { 'margin': '0 auto' },
            classes: 'mdl-cell mdl-cell--3-col mdl-cell--4-col-phone',
            clickOutsideToClose: true,
            animate: true,
            openFrom: $event,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
        pDialog.subscribe((dialogReference: MdlDialogReference) => {
            console.log('dialog visible', dialogReference);
        });
    }

    public showHelp($event: MouseEvent) {
        const pDialog = this.dialogService.showCustomDialog({
            component: HelpComponent,
            providers: [{ provide: TEST_VALUE, useValue: 'Just an example' }],
            isModal: true,
            styles: { 'margin': '0 auto' },
            classes: 'mdl-cell mdl-cell--3-col mdl-cell--4-col-phone',
            clickOutsideToClose: true,
            animate: true,
            openFrom: $event,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
        pDialog.subscribe((dialogReference: MdlDialogReference) => {
            console.log('dialog visible', dialogReference);
        });
    }
}
