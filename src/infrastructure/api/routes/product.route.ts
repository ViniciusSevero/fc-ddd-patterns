import express, {request, Request, Response} from "express"
import CreateProductUsecase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUsecase(repository);
    try {
        const produtctDto =  {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        }
        const outputDto = await usecase.execute(produtctDto)
        res.send(outputDto)
    } catch (err) {
        res.status(500).send(err)
    }
})

productRoute.get("/", async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const usecase = new ListProductUseCase(repository);
    try {
        const outputDto = await usecase.execute({})
        res.send(outputDto)
    } catch (err) {
        res.status(500).send(err)
    }
})