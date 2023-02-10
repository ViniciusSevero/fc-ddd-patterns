import express, {Request, Response} from "express"
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const respository = new CustomerRepository();
    const usecase = new CreateCustomerUseCase(respository);
    try {
        const customerDto =  {
            name: req.body.name,
            address:{
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        }
        const outputDto = await usecase.execute(customerDto)
        res.send(outputDto)
    } catch (err) {
        res.status(500).send(err)
    }
})

customerRoute.get('/', async (req: Request, res: Response) => {
    const respository = new CustomerRepository();
    const usecase = new ListCustomerUseCase(respository);

    const outputDto = await usecase.execute({})
    
    res.format({
        json: async () => parseResponse(res, (res: Response) => res.send(outputDto)),
        xml: async () => parseResponse(res, (res: Response) => res.send(CustomerPresenter.toXML(outputDto)))
    })
})

const parseResponse = async (res: Response, callback: (res: Response) => {}) => {
    try {
        callback(res)
    } catch (err) {
        res.status(500).send(err)
    }
}
