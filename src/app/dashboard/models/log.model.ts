export class Log {
    constructor(
        public id: number,
        public messageType: number,
        public title: string,
        public message: string,
        public created: Date,
        public isRead: boolean
    ) { }
}
