import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SignalRConnection, BroadcastEventListener, ConnectionStatus } from 'ng2-signalr';

import { MdlSnackbarService } from '@angular-mdl/core';
import { LogApiService } from './services/log-api.service';
import { Log } from './models/log.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    public logs: Log[] = [];
    public filteredLogs: Log[] = [];
    public filterTypes: number[] = [0, 1, 2, 3];
    public errorMessage: string;
    public loading = false;
    public searchTerm = '';
    private connection: SignalRConnection;
    private subscription: Subscription;

    constructor(private service: LogApiService,
        private mdlSnackbarService: MdlSnackbarService,
        private route: ActivatedRoute) {
        this.connection = route.snapshot.data['connection'];
    }

    ngOnInit() {
        console.log('init');

        if (this.connection) {
            this.subscribe();

            this.mdlSnackbarService.showToast('Connection established');
        } else {
            this.mdlSnackbarService.showToast('Error: Couldn\'t establish SignalR connection');
        }
        this.getLogs();
    }

    subscribe() {
        console.log(`*** Connection status: ${status}`);

        const onMessageSent$ = new BroadcastEventListener<any>('publishMessage');
        const onUpdateMessage$ = new BroadcastEventListener<any>('updateMessage');

        this.connection.status.subscribe((status: ConnectionStatus) => {
            console.log(`*** Connection status: ${status}`);
        });

        // listen for connection errors
        this.connection.errors.subscribe((error: any) => {
            console.log(`*** Error status: ${error}`);
        });

        // register the listeners
        this.connection.listen(onMessageSent$);
        this.connection.listen(onUpdateMessage$);

        // subscribe to event
        this.subscription = onMessageSent$.subscribe((logMessage: Log) => this.onMessageSent(logMessage));

        this.subscription = onUpdateMessage$.subscribe((logMessage: Log) => this.onUpdateMessage(logMessage));
    }

    onMessageSent(logMessage: Log) {
        console.log(`log message received`);
        console.log(logMessage);
        this.mdlSnackbarService.showToast('New message received');
        this.logs.push(logMessage);
        this.sortLogs();
        this.createFilteredLogs();
    }

    onUpdateMessage(logMessage: Log) {
        console.log(`update message received`);
        console.log(logMessage);

        const logItem = this.logs.find(x => x.id === logMessage.id);
        Object.assign(logItem, logMessage);

        this.mdlSnackbarService.showToast('Message dismissed');
        this.createFilteredLogs();
    }

    clearSearch() {
        this.searchTerm = '';
    }

    createFilteredLogs() {
        this.filteredLogs = this.logs.filter((element) => {
            return this.filterTypes.indexOf(element.messageType) !== -1 && !element.isRead;
        });
        console.log(this.filteredLogs);
    }

    sortLogs() {
        this.logs = this.logs.sort((a: Log, b: Log) => {
            const aa = new Date(a.created).getTime();
            const bb = new Date(b.created).getTime();
            return aa > bb ? -1 : aa < bb ? 1 : 0;
        });
    }

    getFilteredLogsWithSearch() {
        return this.filteredLogs.filter((element) => {
            return element.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
    }

    onFilterChanged(selectedTypes: number[]) {
        console.log('event received');
        console.log(selectedTypes);
        this.filterTypes = selectedTypes;
        this.createFilteredLogs();
    }

    /**
    * Handle the nameListService observable
    */
    getLogs() {
        this.loading = true;
        this.service.get()
            .subscribe(
            logs => this.logs = this.filteredLogs = logs,
            error => {
                this.errorMessage = <any>error;
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
            );
    }
}
