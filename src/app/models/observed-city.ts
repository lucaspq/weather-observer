export class ObservedCity {
    city: string;
    startDateTime: Date;
    endDateTime: Date;

    constructor(city: string, startDateTime: Date, endDateTime: Date) {
        this.city = city;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    active() {
        const currentDateTime = new Date();
        return currentDateTime >= this.startDateTime && currentDateTime <= this.endDateTime;
    }
}
