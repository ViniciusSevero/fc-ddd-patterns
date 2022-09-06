import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is blank", () => {
        expect(() => {
             const customer = new Customer("", "john");
        }).toThrowError("Id is required")
    })

    it("should throw error when name is blank", () => {
        expect(() => {
             const customer = new Customer("123", "");
        }).toThrowError("Name is required")
    })

    it("should change name", () => {
        const customer = new Customer("123", "john");
        
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane")
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");

        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        
        customer.Address = address

        customer.activate()

        expect(customer.isActive()).toBeTruthy()
    })

    it("should throw error when activate customer withou addres", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");

            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer")
    })

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");

        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        
        customer.Address = address

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })
})