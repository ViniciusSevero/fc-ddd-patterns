import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Find Customer Usecase tests", () => {

    const customerMock = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 132, "99999999", "São Paulo");
    customerMock.Address = address;

    const MockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(customerMock)),
            findAll: jest.fn(),
        }
    }

    it("should find a customer", async() => {
       
        const usecase = new FindCustomerUseCase(MockRepository());

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

    it("should not find a customer", async() => {
       
        const repository = MockRepository()
        repository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        })
        const usecase = new FindCustomerUseCase(repository);
        

        const input = {
            id: "1"
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("Customer not found")

    })

})