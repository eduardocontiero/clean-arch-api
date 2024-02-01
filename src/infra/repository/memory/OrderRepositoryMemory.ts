import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {

    orders: Order[];

    constructor() {
        this.orders = [];
    }
    
    async findAll(): Promise<Order[]> {
       return this.orders;
    }
    async get(code: string): Promise<Order> {
       const order = this.orders.find(order => order.getCode() === code);
       if(!order) throw new Error("Order not found");
       return order;
    }
   

    save(order: Order): Promise<void> {
        this.orders.push(order);
        return Promise.resolve();
    }

    count(): Promise<number> {
        return Promise.resolve(this.orders.length);
    }

    async clear(): Promise<void> {
       this.orders = [];
    }

}