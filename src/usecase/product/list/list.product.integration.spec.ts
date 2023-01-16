import Product from "../../../domain/product/entity/product";
import { setupSequelize } from "../../../infrastructure/@shared/repository/sequelize-setup";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

setupSequelize({
    models: [
        ProductModel
    ]
});

describe("List products integration tests", () => {

    const repository = new ProductRepository()

    const product1 = new Product("1", "Product 1", 10.0)
    const product2 = new Product("2", "Product 2", 12.0)

    beforeEach(async () => {
        repository.create(product1);
        repository.create(product2);
    });

    it("Should list products", async () => {
        
        const useCase = new ListProductUseCase(repository);
        const output = await useCase.execute({});

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].price).toBe(product1.price)
        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].price).toBe(product2.price)

    })
})