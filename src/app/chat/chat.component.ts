import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SignalRConnection, BroadcastEventListener } from 'ng2-signalr';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.css'],
})
export class ChatComponent implements OnInit {

    private _connection: SignalRConnection;
    public chatMessages: any[] = [];
    public listenCode: string = '';
    public chatCode: string = '';

    public chatMessage = '';

    private _subscription: Subscription;

    constructor(private route: ActivatedRoute) {
        this._connection = this.route.snapshot.data['connection'];
    }

    ngOnInit() {
        let onMessageSent$ = new BroadcastEventListener<any>('addNewMessageToPage');
        // register the listener
        this._connection.listen(onMessageSent$);

        // subscribe to event
        this._subscription = onMessageSent$.subscribe((chatMessage: any) => {
            console.log(`chatMessage received ${chatMessage}`);
            this.chatMessages.push(chatMessage);
        });
    }

    sendMessage() {
        console.log('onChatMessage');
        this._connection.invoke('send', 'Risto', this.chatMessage)
            .catch((err: any) => console.log('Failed to invoke \'Chat\'. Error occured. Error:' + err));
    }

}
