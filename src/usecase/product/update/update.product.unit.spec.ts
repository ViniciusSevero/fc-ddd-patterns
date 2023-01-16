import Product from "../../../domain/product/entity/product"
import UpdateProductUsecase from "./update.product.usecase"

const product = new Product("1", "teste", 1.0)

const input = {
    id: "1",
    name: "Product 1",
    price: 10.0
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
}

describe("Update Procuct Use ase Unit tests", () => {

    it("Should update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUsecase(productRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })

})