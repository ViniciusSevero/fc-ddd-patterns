import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import CustomerUpdateUseCase from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress(
    "teste", new Address("street", 123, "00000-000", "SP")
)

const input = {
    id: customer.id,
    name: "teste",
    address: {
        street: "teste",
        number: 123,
        zip: "0000000",
        city: "Sao Paulo",
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    }
}

describe("Update customer unit tests", () => {

    it("Should update a customer", async () => {

        const customerRepository = MockRepository();
        const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input)

        expect(output).toEqual(input)

    })
})