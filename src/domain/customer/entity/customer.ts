import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcherFactory from "../../@shared/event/event-dispatcher.factory";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super(id)
    this._name = name;
    this.validate();
    this.notifyWhenCustomerIsCreated()
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required"
      })
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required"
      })
    }
    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }


  changeAddress(address: Address) {
    this._address = address;
    this.notifyWhenCustomerAddressIsChanged();
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  notifyWhenCustomerIsCreated() {
    const event = new CustomerCreatedEvent(this);
    EventDispatcherFactory.getEventDispatcher().notify(event);
  }

  notifyWhenCustomerAddressIsChanged() {
    const event = new CustomerAddressChangedEvent(this);
    EventDispatcherFactory.getEventDispatcher().notify(event);
  }

  get name(): string {
    return this._name;
  }

  get Address(): Address {
    return this._address;
  }

  
  get rewardPoints() : number {
    return this._rewardPoints;
  }

  public set Address(address : Address) {
    this._address = address;
  }
  
}