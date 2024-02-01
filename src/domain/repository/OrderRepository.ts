import Order from "../entity/Order";
// repositorio deve retornar uma entidade

export default interface OrderRepository {
    save(order: Order): Promise<void>;
    findAll(): Promise<Order[]>;
    get(code: string): Promise<Order>;
    count(): Promise<number>;
    clear(): Promise<void>;
}