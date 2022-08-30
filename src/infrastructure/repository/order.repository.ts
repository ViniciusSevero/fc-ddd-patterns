import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        const model = {
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(i => {
                return {
                    id: i.id,
                    name: i.name,
                    price: i.price,
                    quantity: i.quantity,
                    order_id: entity.id,
                    product_id: i.productId,
                }
            })
        }
        await OrderModel.create(model, {
            include: [OrderItemModel]
        })
    }

    async update(entity: Order): Promise<void> {
        const orderModel = await OrderModel.findOne(
            {
                where: { id: entity.id },
                include: ["items", "customer"],
            }
        )

        orderModel.id = entity.id
        orderModel.customer_id = entity.customerId
        orderModel.total = entity.total()

        const destroyOperations = orderModel.items.map((i) => i.destroy())
        await Promise.all(destroyOperations)

        const createOperations = entity.items.map(i => {
            OrderItemModel.create({
                id: i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                order_id: entity.id,
                product_id: i.productId,
            })
        })
        await Promise.all(createOperations)

        const newItensPromises = entity.items.map(i => OrderItemModel.findByPk(i.id))

        const newItens = await Promise.all(newItensPromises)

        orderModel.items = newItens

        await orderModel.save()
    }
    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne(
                {
                    where: { id: id },
                    include: ["items", "customer"],
                    rejectOnEmpty: true
                }
            );
        } catch (error) {
            console.log(error)
            throw new Error("Order not found");
        }

        return this.toDomain(orderModel);
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll(
            {
                include: ["items"]
            }
        );

        return orders.map(model => this.toDomain(model))
    }


    private toDomain(orderModel: OrderModel): Order {
        const items = orderModel.items.map(i => {
            return new OrderItem(
                i.id,
                i.name,
                i.price,
                i.product_id,
                i.quantity
            )
        })

        return new Order(orderModel.id, orderModel.customer_id, items);
    }
    
}