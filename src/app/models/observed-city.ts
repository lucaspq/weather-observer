export class ObservedCity {
    city: string;
    startDateTime?: Date;
    endDateTime?: Date;

    constructor(city: string) {
        this.city = city;
    }
}
