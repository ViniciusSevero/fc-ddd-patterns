import Product from "../../../domain/product/entity/product";
import { setupSequelize } from "../../../infrastructure/@shared/repository/sequelize-setup";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

setupSequelize({
    models: [
        ProductModel
    ]
});

const product1 = new Product("1", "Product 1", 10.0)

const input = {
    id: "1"
}

describe("Find product integration tests", () => {

    it("Should Find product", async () => {
        
        const repository = new ProductRepository();
        repository.create(product1);

        const useCase = new FindProductUseCase(repository);
        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        })
    })
})