import { Utils } from "sequelize/types"
import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
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
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Create Customer Use ase Unit tests", () => {

    it("Should create a customer", async () => {

        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(customerRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.anything(),
            name: output.name,
            address: {
                street: output.address.street,
                number: output.address.number,
                zip: output.address.zip,
                city: output.address.city,
            }  
        })

    })


    it("Should throw an error when name is missing", async () => {

        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(customerRepository)

        input.name = ""

        await expect(usecase.execute(input)).rejects.toThrow("Name is required")
    })

})