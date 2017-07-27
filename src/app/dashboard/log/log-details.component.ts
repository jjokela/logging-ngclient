import { Component, OnInit, InjectionToken, ViewChild, Inject, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MdlTextFieldComponent } from '@angular-mdl/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { Log } from '../models/log.model';
import { SeedService } from '../services/seed.service';

export const TEST_VALUE = new InjectionToken<string>('test value');

@Component({
    selector: 'app-log-details',
    templateUrl: 'log-details.component.html',
    styleUrls: ['log-details.component.css']
})

export class LogDetailsComponent implements OnInit {

    constructor(
        private dialog: MdlDialogReference,
        private fb: FormBuilder,
        private service: SeedService,
        public log: Log) {

        console.log(`injected test value: ${log.title}`);

        // just if you want to be informed if the dialog is hidden
        this.dialog.onHide().subscribe((user) => {
            console.log('login dialog hidden');
        });

    }

    public ngOnInit() {

    }

    public close() {
        this.dialog.hide();
    }

    public dismiss() {
        this.log.isRead = true;

        this.service.dismiss(this.log)
            .subscribe(
            log => console.log('dismissed'),
            error => {
                console.log(error);
            },
            () => {
                console.log('dun');
            }
        );
        this.dialog.hide();
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }
}
