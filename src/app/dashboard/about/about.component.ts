import { Component, OnInit, InjectionToken, ViewChild, Inject, HostListener } from '@angular/core';

import { MdlDialogReference } from '@angular-mdl/core';

@Component({
    selector: 'app-about-log',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})

export class AboutComponent implements OnInit {

    constructor(
        private dialog: MdlDialogReference) {

        // just if you want to be informed if the dialog is hidden
        this.dialog.onHide().subscribe((user) => {
            console.log('login dialog hidden');
        });
    }

    public ngOnInit() { }

    public close() {
        this.dialog.hide();
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }
}
