import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, 
        {
            where: { id: entity.id }
        })
    }
    
    async find(id: string): Promise<Customer> {
        let customerModel;
        
        try {
            customerModel = await CustomerModel.findOne(
                { where: { id: id },
                rejectOnEmpty: true
            });
        } catch(error) {
            console.log(error)
            throw new Error("Customer not found");
        }

        const customer = this.toDomain(customerModel);
       
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return customers.map(model => this.toDomain(model))
    }

    private toDomain(customerModel: CustomerModel): Customer {
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zip,
            customerModel.city,
        )

        const customer =  new Customer(
            customerModel.id,
            customerModel.name,
        )

        customer.changeAddress(address);
        customer.addRewardPoints(customer.rewardPoints);
        if(customerModel.active) {
            customer.activate()
        }

        return customer;

    }
    
}