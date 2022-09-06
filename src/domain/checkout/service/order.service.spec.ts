import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Orders Service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("oi1", "Order Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    })

    it("should calculate total of all orders", () => {
        const item1 = new OrderItem("oi1", "Order Item 1", 100, "p1", 1);
        const item2 = new OrderItem("oi2", "Order Item 2", 200, "p1", 2);

        const order1 = new Order("01", "c1", [item1]);
        const order2 = new Order("02", "c2", [item2]);
        
        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    })
})