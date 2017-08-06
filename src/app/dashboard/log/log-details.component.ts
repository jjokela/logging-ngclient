import { Component, OnInit, InjectionToken, ViewChild, Inject, HostListener } from '@angular/core';
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

    public saving = false;

    constructor(
        private dialog: MdlDialogReference,
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
        this.saving = true;
        this.service.dismiss(this.log)
            .subscribe(
            log => console.log('dismissed'),
            error => {
                console.log(error);
                this.saving = false;
            },
            () => {
                console.log('dun');
                this.saving = false;
                this.dialog.hide();
            }
        );
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }
}
