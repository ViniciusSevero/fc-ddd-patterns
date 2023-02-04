import Notification from "./notification";

describe("Notification Unit tests", () => {
    it("Should create errors", () => {
        const notification = new Notification();

        notification.addError({
            message: "error message",
            context: "customer"
        })
        notification.addError({
            message: "error message",
            context: "product"
        })
        notification.addError({
            message: "error message 2",
            context: "customer"
        })
        
        expect(notification.messages("customer")).toBe("customer: error message, customer: error message 2")
        expect(notification.messages("product")).toBe("product: error message")
        expect(notification.messages()).toBe("customer: error message, product: error message, customer: error message 2")
    })

    it("Should check if has at least one error", () => {
        const notification = new Notification();

        notification.addError({
            message: "error message",
            context: "customer"
        })

        expect(notification.hasErrors()).toBe(true);
    })

    it("should get erros", () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.errors).toEqual([error]);
    })
})