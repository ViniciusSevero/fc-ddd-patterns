import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import { v4 as uuid } from "uuid"
import Customer from "../../customer/entity/customer";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, o) => acc + o.total(), 0)
    }

    static placeOrder(customer: Customer, itens: OrderItem[]) : Order {

        if(itens.length === 0) {
            throw new Error("Order must have at least one item");
        }

        const order = new Order(uuid(), customer.id, itens);
        const rewardPoints = order.total() / 2
        
        customer.addRewardPoints(rewardPoints);
        
        return order
    }
}