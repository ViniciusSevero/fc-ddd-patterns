import EventDispatcher from "./event-dispatcher";
import EventDispatcherInterface from "./event-dispatcher.interface";

export default class EventDispatcherFactory {
    private static eventDispatcher: EventDispatcher;

    private constructor() {}

    public static getEventDispatcher() : EventDispatcher {
        if(!this.eventDispatcher) {
            this.eventDispatcher = new EventDispatcher();
        }

        return this.eventDispatcher;
    }
}