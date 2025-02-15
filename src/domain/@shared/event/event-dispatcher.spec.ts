import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events teste", () => {

    it("Should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

    })

    it("Should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);

    })

    it("Should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeUndefined();

    })

    it("Should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spy = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        
        const event = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        })

        eventDispatcher.notify(event)
        
        expect(spy).toHaveBeenCalled()

    })

})