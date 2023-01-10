import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputListCutomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCutomerDto): Promise<OutputListCustomerDto> {
        const output =  await this.customerRepository.findAll()
        return {
            customers: output.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.Address.street,
                        number: customer.Address.number,
                        zip: customer.Address.zip,
                        city: customer.Address.city,
                    }
                }
            })
        }
    }
}