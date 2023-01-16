import { setupSequelize } from "../../../infrastructure/@shared/repository/sequelize-setup";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "./create.product.usecase"

const input = {
    id: "1",
    name: "Product 1",
    price: 10.0
}

setupSequelize({
    models: [
        ProductModel
    ]
});

describe("Create Procuct Use case integration tests", () => {

    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUsecase(productRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })

})