import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";
import { setupSequelize } from "./sequelize-setup";

describe("Order repository tests", () => {

    setupSequelize({
        models: [
            ProductModel, CustomerModel, OrderItemModel, OrderModel
        ]
    });

    it("Should create a new Order", async () => {
        // Create Customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;
        await customerRepository.create(customer);

        // Create Product
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        // Create Order
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        
        // Execute
        const orderModel = await OrderModel.findOne(
            {
                where: { id: order.id },
                include: ["items", "customer"],
            }
        )

        // Assertions
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: customer.id,
            total: order.total(),
            customer: {
                id: customer.id,
                name: customer.name,
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
            },
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    product_id: orderItem.productId,
                    order_id: "123",
                    quantity: orderItem.quantity,
                }
            ]
        })

    })



    it("Should update an Order", async () => {
        // Create Customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;
        await customerRepository.create(customer);

        // Create Product
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        // Create Order
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // Create second Product
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product2);

        // Create third Product
        const product3 = new Product("3", "Product 3", 50);
        await productRepository.create(product3);

        // Create new OrderItems
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 10);
        const orderItem3 = new OrderItem("3", product3.name, product3.price, product3.id, 5);

        // Update order
        order.items.push(orderItem2)
        order.items.push(orderItem3)
        await orderRepository.update(order);

        
        // Execute
        const orderModel = await OrderModel.findOne(
            {
                where: { id: order.id },
                include: ["items", "customer"],
            }
        )

        // Assertions
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: customer.id,
            total: order.total(),
            customer: {
                id: customer.id,
                name: customer.name,
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
            },
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    product_id: orderItem.productId,
                    order_id: "123",
                    quantity: orderItem.quantity,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    product_id: orderItem2.productId,
                    order_id: "123",
                    quantity: orderItem2.quantity,
                },
                {
                    id: orderItem3.id,
                    name: orderItem3.name,
                    price: orderItem3.price,
                    product_id: orderItem3.productId,
                    order_id: "123",
                    quantity: orderItem3.quantity,
                }
            ]
        })

    })


    it("Should find a new Order", async () => {
        // Create Customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;
        await customerRepository.create(customer);

        // Create Product
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        // Create Order
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // Get Domain Entity
        const foundOrder = await orderRepository.find(order.id);

        // Assertions
        expect(foundOrder).toEqual(order);

    })

    it("Should find all orders", async () => {
        // Create Customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 132, "99999999", "São Paulo");
        customer.Address = address;
        await customerRepository.create(customer);

        // Create Product
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        // Create Order
        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order1 = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order1);

        // Create Order
        const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 10);
        const order2 = new Order("321", customer.id, [orderItem2]);
        await orderRepository.create(order2);

        // Get Domain Entity
        const orders = await orderRepository.findAll();

        // Assertions
        expect(orders).toEqual([order1, order2]);

    })


});