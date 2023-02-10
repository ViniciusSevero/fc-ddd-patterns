import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E Customer testes", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a cutomer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "customer 1",
                address: {
                    street: "customer address street",
                    number: "customer address number",
                    zip: "customer address zip",
                    city: "customer address city",
                }
            })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("customer 1")
        expect(response.body.address.street).toBe("customer address street")
        expect(response.body.address.number).toBe("customer address number")
        expect(response.body.address.zip).toBe("customer address zip")
        expect(response.body.address.city).toBe("customer address city")

    })

    it("Should not create a cutomer and return stausCode 500", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "customer 1"
            })

        expect(response.status).toBe(500)
    })

    it("Should list customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "customer 1",
                address: {
                    street: "customer address street",
                    number: "customer address number",
                    zip: "customer address zip",
                    city: "customer address city",
                }
            })

        expect(response.status).toBe(200)

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "customer 2",
                address: {
                    street: "customer address street",
                    number: "customer address number",
                    zip: "customer address zip",
                    city: "customer address city",
                }
            })

        expect(response2.status).toBe(200)

        const response3 = await request(app).get("/customer").send()

        expect(response3.status).toBe(200)
        expect(response3.body.customers.length).toBe(2)
        const customer1 = response3.body.customers[0]
        expect(customer1.name).toBe("customer 1")
        const customer2 = response3.body.customers[1]
        expect(customer2.name).toBe("customer 2")
       

    })


    it("Should list customers by XML", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "customer 1",
                address: {
                    street: "customer address street",
                    number: "customer address number",
                    zip: "customer address zip",
                    city: "customer address city",
                }
            })

        expect(response.status).toBe(200)

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "customer 2",
                address: {
                    street: "customer address street",
                    number: "customer address number",
                    zip: "customer address zip",
                    city: "customer address city",
                }
            })

        expect(response2.status).toBe(200)

        const responseXml = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send()

        expect(responseXml.status).toBe(200)
        expect(responseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    })
})