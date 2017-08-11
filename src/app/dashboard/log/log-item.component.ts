import { Component, Input, OnInit } from '@angular/core';
import { MdlModule } from '@angular-mdl/core';
import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';

import { LogDetailsComponent } from './log-details.component';
import { TEST_VALUE } from './log-details.component';

import { Log } from '../models/log.model';

@Component({
    selector: 'app-log-item',
    templateUrl: 'log-item.component.html',
    styleUrls: ['log-item.component.css']
})

export class LogItemComponent implements OnInit {
    constructor(private dialogService: MdlDialogService,
        private snackbarService: MdlSnackbarService) { }

    @Input() log: Log;

    currentClasses: {};

    ngOnInit() {
        this.setCurrentClasses();
    }

    setCurrentClasses() {
        // CSS classes: added/removed per current state of component properties
        this.currentClasses = {
            'item1': true,
            'error': this.log.messageType === 0,
            'warning': this.log.messageType === 1,
            'success': this.log.messageType === 2,
            'information': this.log.messageType === 3
        };
    }

    public mapEnumToIcon(messageType: number) {

        let iconText: string;

        switch (messageType) {
            case 0: // error
                iconText = 'highlight_off';
                break;
            case 1: // warning
                iconText = 'error_outline';
                break;
            case 2: // success
                iconText = 'done';
                break;
            case 3: // information
                iconText = 'info_outline';
                break;
            default:
                break;
        }
        return iconText;
    }

    public alert() {
        const result = this.dialogService.alert('This is a simple Alert');
        result.subscribe(() => console.log('alert closed'));
    }

    public showDialog($event: MouseEvent) {
        const pDialog = this.dialogService.showCustomDialog({
            component: LogDetailsComponent,
            providers: [{ provide: Log, useValue: this.log }],
            isModal: true,
            styles: { 'margin': '0 auto' },
            classes: 'mdl-cell mdl-cell--10-col mdl-cell--4-col-phone',
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
