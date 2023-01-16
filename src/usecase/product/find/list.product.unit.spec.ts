import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product1 = new Product("1", "Product 1", 10.0)

const input = {
    id: "1"
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product1)),
        findAll: jest.fn(),
    }
}

describe("Find product unit tests", () => {

    it("Should Find product", async () => {
        
        const repository = MockRepository();
        const useCase = new FindProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        })

    })
})