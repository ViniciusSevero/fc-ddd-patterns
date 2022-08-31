import Customer from "../../entity/customer";
import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: Customer;

    constructor(customer: Customer) {
        this.eventData = customer;
    }
}