import Coupon from "../../../domain/entity/Coupon";
import DefaultFreightCalculator from "../../../domain/entity/DefaultFreightCalculator";
import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DbConnection from "../../database/DbConnection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: DbConnection) { }


    async findAll(): Promise<Order[]> {
        const orders: Order[] = [];
        const ordersData = await this.connection.query("select * from order_clean_arch.order", []);
        for(const orderData of ordersData){
            const order = await this.get(orderData.code);
            orders.push(order);
        }

        return orders;
    }


    async get(code: string): Promise<Order> {
        const [orderData] = await this.connection.query("select * from order_clean_arch.order where code = ?", [code]);

        if (!orderData) throw new Error("Order not found");
        const order = new Order(orderData.cpf, orderData.issue_date, new DefaultFreightCalculator(), orderData.sequence);
        const orderItemsData = await this.connection.query("select * from order_clean_arch.order_item where id_order = ?", [orderData.id_order]);


        for (const orderItemData of orderItemsData) {
            const [itemData] = await this.connection.query("select * from order_clean_arch.item where id_item = ?", [orderItemData.id_item]);
            const item = new Item(itemData.id_item, itemData.category, itemData.description, parseFloat(orderItemData.price), itemData.width, itemData.height, itemData.length, itemData.weight);
            order.addItem(item, orderItemData.quantity);
        }
        if (orderData.coupon) {
            const [couponData] = await this.connection.query("select * from order_clean_arch.coupon where code = ?", [orderData.coupon]);
            const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
            order.addCoupon(coupon);
        }


        return order;
    }


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