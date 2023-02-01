import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E Product tests", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: "1",
                name: "Product 1",
                price: 10.0
            })

        expect(response.status).toBe(200)
        expect(response.body.id).toBe("1")
        expect(response.body.name).toBe("Product 1")
        expect(response.body.price).toBe(10.0)

    })

    it("Should not create a product and return stausCode 500", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
            })


        expect(response.status).toBe(500)
    })

    it("Should list customers", async () => {
        await request(app)
            .post("/product")
            .send({
                id: "1",
                name: "Product 1",
                price: 10.0
            })

        await request(app)
            .post("/product")
            .send({
                id: "2",
                name: "Product 2",
                price: 20.0
            })

        const response = await request(app).get("/product").send()

        expect(response.status).toBe(200)
        expect(response.body.products.length).toBe(2)
        const product1 = response.body.products[0]
        expect(product1.name).toBe("Product 1")
        const product2 = response.body.products[1]
        expect(product2.name).toBe("Product 2")
       

    })
})