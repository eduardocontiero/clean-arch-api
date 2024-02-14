import ItemDAO from "../../application/dao/ItemDAO";
import DbConnection from "../database/DbConnection";

export default class ItemDAODatabase implements ItemDAO {

	constructor (readonly connection: DbConnection) {
	}

	async findAll(): Promise<any> {
		const items = await this.connection.query("select * from order_clean_arch.item", []);
		return items.map(function (item: any) {
			item.idItem = item.id_item;
			item.price = parseFloat(item.price);
			return item;
		});
	}
}