import CreateProductUsecase from "./create.product.usecase"

const input = {
    id: "1",
    name: "Product 1",
    price: 10.0
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Create Procuct Use ase Unit tests", () => {

    it("Should create a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })

})