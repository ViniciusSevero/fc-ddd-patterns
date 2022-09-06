import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHadlers: { [eventName: string]: EventHandlerInterface[] } = {};

    public getEventHandlers(eventName: string) : EventHandlerInterface[] {
        return this.eventHadlers[eventName];
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(this.eventHadlers[eventName] === undefined) {
            this.eventHadlers[eventName] = [];
        }
        this.eventHadlers[eventName].push(eventHandler)
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(this.eventHadlers[eventName]) {
            const index = this.eventHadlers[eventName].indexOf(eventHandler);
            if(index !== -1) {
                this.eventHadlers[eventName].splice(index, 1)
            }
        }
    }
    notify(event: EventInterface): void {
        const eventName = event.constructor.name
        if(this.eventHadlers[eventName]) {
            this.eventHadlers[eventName].forEach(handler => handler.handle(event))
        }
    }
    unregisterAll(): void {
        this.eventHadlers = {}
    }
    
    
}