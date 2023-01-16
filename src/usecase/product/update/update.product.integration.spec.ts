import Product from "../../../domain/product/entity/product";
import { setupSequelize } from "../../../infrastructure/@shared/repository/sequelize-setup";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";

setupSequelize({
    models: [
        ProductModel
    ]
});

describe("Update Procuct integration tests", () => {

    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "teste", 1.0)
        productRepository.create(product)
        
        const usecase = new UpdateProductUsecase(productRepository)
        const input = {
            id: "1",
            name: "Product 1",
            price: 10.0
        }
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })

})