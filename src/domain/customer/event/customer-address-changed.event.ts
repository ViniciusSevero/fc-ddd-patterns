import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export default class CustomerAddressChangedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: Customer;

    constructor(customer: Customer) {
        this.eventData = customer;
    }
}