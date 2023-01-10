import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { setupSequelize } from "../../../infrastructure/@shared/repository/sequelize-setup";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Find Customer Usecase tests", () => {

    setupSequelize({
        models: [
            CustomerModel
        ]
    });

    it("should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "1"
        }

        const expectedOutput = {
            id: "1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 132,
                zip: "99999999",
                city: "São Paulo"
            }
        }

        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput)

    })

})