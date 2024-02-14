import OrderDAO from "../../application/dao/OrderDAO";
import DbConnection from "../database/DbConnection";

export default class OrderDAODatabase implements OrderDAO {

	constructor (readonly connection: DbConnection) {
	}

	async get(code: string): Promise<any> {
		return this.connection.query("select code, total from order_clean_arch.order where code = ?", [code]);
	}

	async findAll(): Promise<any> {
		return this.connection.query("select code, total from order_clean_arch.order", []);
	}
}
