import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import { setupSequelize } from "./sequelize-setup";

describe("Product repository teste", () => {

    setupSequelize({
        models: [
            ProductModel
        ]
    });

    it("Should create a Product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    })

    it("Should update a Product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });

        product.changeName("Product 2");
        product.changePrice(200)

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        });

    })

    it("Should find a Product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const foundProduct = await productRepository.find(product.id);

        expect(foundProduct.id).toBe(product.id)
        expect(foundProduct.name).toBe(product.name)
        expect(foundProduct.price).toBe(product.price)
    });

    it("Should find all Products", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        const products = [product, product2]

        await productRepository.create(product);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();

        expect(foundProducts).toEqual(products);
    });


});