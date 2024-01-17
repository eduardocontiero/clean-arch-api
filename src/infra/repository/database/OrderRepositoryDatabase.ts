import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DbConnection from "../../database/DbConnection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: DbConnection) { }
   

    async save(order: Order): Promise<void> {

        const result = await this.connection.query("INSERT INTO order_clean_arch.order (code, cpf, issue_date, freight, sequence, coupon) VALUES (?, ?, ?, ?, ?,?)", [order.getCode(), order.getCpf(), order.date, order.getFreight(), order.sequence, order.coupon?.code])


        for (const orderItem of order.getOrderItems()) {
            await this.connection.query("INSERT INTO order_clean_arch.order_item (id_item, id_order, price, quantity) VALUES (?, ?, ?, ?) ", [orderItem.idItem, result.insertId, orderItem.price, orderItem.quantity]);
        }

    }
    async count(): Promise<number> {
        const [orderData] = await this.connection.query("SELECT COUNT(*) AS count FROM `order`", []);

        return orderData.count;
    }

    async clear(): Promise<void> {
        await this.connection.query("delete from order_clean_arch.order_item", []);
        await this.connection.query("delete from order_clean_arch.order", []);
    }

}