import { Component, OnInit, InjectionToken, ViewChild, Inject, HostListener } from '@angular/core';

import { MdlTextFieldComponent } from '@angular-mdl/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { SeedService } from '../services/seed.service';

@Component({
    selector: 'app-help-log',
    templateUrl: 'help.component.html',
    styleUrls: ['help.component.css']
})

export class HelpComponent implements OnInit {

    ACTION = { LEFT: 2, RIGHT: 4, UP: 8, DOWN: 16, TAP: 1 };

    sequence = [
        { action: this.ACTION.UP, icon: 'arrow_upward' },
        { action: this.ACTION.UP, icon: 'arrow_upward' },
        { action: this.ACTION.DOWN, icon: 'arrow_downward' },
        { action: this.ACTION.DOWN, icon: 'arrow_downward' },
        { action: this.ACTION.LEFT, icon: 'arrow_back' },
        { action: this.ACTION.RIGHT, icon: 'arrow_forward' },
        { action: this.ACTION.LEFT, icon: 'arrow_back' },
        { action: this.ACTION.RIGHT, icon: 'arrow_forward' },
        { action: this.ACTION.TAP, icon: 'radio_button_checked' },
        { action: this.ACTION.TAP, icon: 'radio_button_checked' }
    ];
    positionInSequence = 0;
    isCompleted = false;

    constructor(
        private dialog: MdlDialogReference,
        private service: SeedService) {

        // just if you want to be informed if the dialog is hidden
        this.dialog.onHide().subscribe((user) => {
            console.log('login dialog hidden');
        });

    }

    public ngOnInit() {

    }

    getNextAction(): number {
        return this.sequence[this.positionInSequence].action;
    }

    validateAction(direction: number) {
        if (direction === this.getNextAction()) {
            console.log(direction + ' : ' + this.positionInSequence);
            this.incrementAction();
        }
    }

    incrementAction() {
        this.positionInSequence++;
        if (this.positionInSequence === this.sequence.length) {
            this.isCompleted = true;
            console.log('set as done');
        }
    }

    tap(action: any) {
        console.log(action.direction);

        if (this.isCompleted) {
            console.log('done');
            return;
        }

        this.validateAction(action.direction);
    }

    swipe(action: any) {
        console.log(action.direction);

        if (this.isCompleted) {
            console.log('done');
            return;
        }

        this.validateAction(action.direction);
    }

    public close() {
        this.dialog.hide();
    }

    public destroy() {
        this.service.resetDb()
            .subscribe(
            response => console.log(response),
            error => {
                console.log(error);
                this.dialog.hide();
            },
            () => {
                console.log('dun');
                // force reload
                window.location.reload();
                // this.dialog.hide();
            }
            );
        this.dialog.hide();
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event);

        if (this.isCompleted) {
            console.log('done');
            return;
        }

        if (event.key === 'ArrowUp') {
            this.validateAction(this.ACTION.UP);
        } else if (event.key === 'ArrowDown') {
            this.validateAction(this.ACTION.DOWN);
        } else if (event.key === 'ArrowLeft') {
            this.validateAction(this.ACTION.LEFT);
        } else if (event.key === 'ArrowRight') {
            this.validateAction(this.ACTION.RIGHT);
        } else if (event.key === ' ') {
            this.validateAction(this.ACTION.TAP);
        }
    }
}
