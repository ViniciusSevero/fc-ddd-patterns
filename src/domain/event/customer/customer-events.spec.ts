import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcherFactory from "../@shared/event-dispatcher.factory";
import EnviaConsoleLog1Handler from "./handlers/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handlers/envia-console-log2.handler";

describe("Customer Domain Events test", () => {

    const eventDispatcher = EventDispatcherFactory.getEventDispatcher()

    it("Should notify handler when new customer is created", () => {
        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
        const spy = jest.spyOn(enviaConsoleLog1Handler, "handle");
        
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toMatchObject(enviaConsoleLog1Handler);

        const customer = new Customer("1", "Customer 1");

        expect(spy).toHaveBeenCalled();

    })

    it("Should notify handler when change customer address", () => {
        const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
        eventDispatcher.register("CustomerAddressChangedEvent", enviaConsoleLog2Handler);
        const spy = jest.spyOn(enviaConsoleLog2Handler, "handle");
        
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]).toMatchObject(enviaConsoleLog2Handler);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.changeAddress(address);

        console.log(eventDispatcher)

        expect(spy).toHaveBeenCalled();

    })

    afterEach(() => {
        eventDispatcher.unregisterAll()
    })


})