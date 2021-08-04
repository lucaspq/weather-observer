export class ObservedCity {
    city: string;
    startDateTime: Date;
    endDateTime: Date;
    temperature: number;
    description: string;
    obsDateTime: Date;
    icon: string;

    constructor(city: string, startDateTime: Date, endDateTime: Date) {
        this.city = city;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.temperature = 0;
        this.description = "";
        this.obsDateTime = null;
        this.icon = "";
    }

}
