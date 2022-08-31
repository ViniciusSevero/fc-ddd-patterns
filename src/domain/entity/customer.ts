import EventDispatcherFactory from "../event/@shared/event-dispatcher.factory";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this.notifyWhenCustomerIsCreated()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
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

  get id(): string {
    return this._id;
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