import { Component, OnInit, InjectionToken, ViewChild, Inject, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MdlTextFieldComponent } from '@angular-mdl/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { SeedService } from '../services/seed.service';
import { Log } from '../models/log.model';
export const TEST_VALUE = new InjectionToken<string>('test value');

@Component({
    selector: 'app-new-log',
    templateUrl: 'new-log-item.component.html',
    styleUrls: ['new-log-item.component.css']
})

export class NewLogItemComponent implements OnInit {

    @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;
    public form: FormGroup;
    public title = new FormControl('', Validators.required);
    public message = new FormControl('', Validators.required);
    public selectedValue = new FormControl('-1', Validators.min(0));

    public processingLogin = false;
    public statusMessage = '';

    constructor(
        private dialog: MdlDialogReference,
        private mdlSnackbarService: MdlSnackbarService,
        private fb: FormBuilder,
        private service: SeedService,
        @Inject(TEST_VALUE) testValue: string) {

        console.log(`injected test value: ${testValue}`);

        // just if you want to be informed if the dialog is hidden
        this.dialog.onHide().subscribe((user) => {
            console.log('login dialog hidden');
            if (user) {
                console.log('authenticated user', user);
            }
        });

        this.dialog.onVisible().subscribe(() => {
            console.log('set focus');
            // this.inputElement.setFocus();
        });

    }


    public ngOnInit() {
        this.form = this.fb.group({
            'title': this.title,
            'message': this.message,
            'selectedValue': this.selectedValue
        });
    }


    public close() {
        this.dialog.hide();
    }

    public create() {

        const log = new Log(-1, this.selectedValue.value, this.title.value, this.message.value, new Date(), false);
        console.log(log);

        this.service.createNew(log)
            .subscribe(
            response => console.log(response),
            error => {
                console.log(error);
                this.dialog.hide();
            },
            () => {
                console.log('dun');
                this.dialog.hide();
            }
        );
//        this.mdlSnackbarService.showToast('Vine');

    }

    public login() {
        this.processingLogin = true;
        this.statusMessage = 'checking your credentials ...';

        // let obs = this.loginService.login(this.username.value, this.password.value);
        // obs.subscribe( user => {

        this.processingLogin = false;
        this.statusMessage = 'you are logged in ...';

        setTimeout(() => {
            this.dialog.hide();
        }, 500);

        // });
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }
}
