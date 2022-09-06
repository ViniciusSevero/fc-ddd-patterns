import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

@Table({
    tableName: "order_itens",
    timestamps: false,
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare price: number;

    @Column
    declare quantity: number;
    
    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    declare order_id: string;

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    declare product_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;


    
}