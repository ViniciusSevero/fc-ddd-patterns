import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import { setupSequelize } from "../../../@shared/repository/sequelize-setup";

describe("Customer repository tests", () => {

    setupSequelize({
        models: [
            CustomerModel
        ]
    });

    it("Should create a Customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });
    })

    it("Should update a Customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });

        const address2 = new Address("Street 2", 111, "1111111", "Rio de Janeiro");

        customer.changeName("Customer 2");
        customer.changeAddress(address2)

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel2.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address2.street,
            number: address2.number,
            zip: address2.zip,
            city: address2.city,
        });

    })

    it("Should find a Customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;

        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find(customer.id);

        expect(foundCustomer.id).toBe(customer.id)
        expect(foundCustomer.name).toBe(customer.name)
        expect(foundCustomer.Address.street).toBe(customer.Address.street)
        expect(foundCustomer.Address.number).toBe(customer.Address.number)
        expect(foundCustomer.Address.zip).toBe(customer.Address.zip)
        expect(foundCustomer.Address.city).toBe(customer.Address.city)
    });

    it("Should find all Customers", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", 115, "11111111", "Manaus");
        customer2.Address = address2;
        const customers = [customer, customer2]

        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();

        expect(foundCustomers).toEqual(customers);
    });

    it("Should receive execption when find a not persisted id", async () => {

        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("not_persisted");
        }).rejects.toThrow("Customer not found")


    });



});