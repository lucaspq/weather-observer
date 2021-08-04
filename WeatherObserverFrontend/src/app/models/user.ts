import { ObservedCity } from "./observed-city";

export class User {
    _id!: String;
    userkey: String;
    observedcities: ObservedCity[];

    constructor(
        userkey: String,
        observedcities: ObservedCity[] = []
    ) {
        this.userkey = userkey,
        this.observedcities = observedcities;
    }
 }