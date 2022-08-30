import Product from "../entity/product"
import ProductService from "./products.service";

describe("Product Service unit tests", () => {

    it("should change ptice of all product", () => {
        const p1 = new Product("product1", "Product 1", 10);
        const p2 = new Product("product2", "Product 2", 20);
        const products = [p1, p2];
        
        ProductService.increasePrice(products, 100);

        expect(p1.price).toBe(20);
        expect(p2.price).toBe(40);
    })
})