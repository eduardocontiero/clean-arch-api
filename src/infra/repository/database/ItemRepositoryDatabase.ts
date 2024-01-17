import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import DbConnection from "../../database/DbConnection";

export default class ItemRepositoryDatabase implements ItemRepository {

    constructor(readonly connection: DbConnection) {

    }
    async findById(idItem: number): Promise<Item | undefined> {
        // connection.query("select * from ccca.item where id_item = $1", [idItem])
        const [itemData] = await this.connection.query("select * from order_clean_arch.item where id_item = ?", [idItem]);
        if (!itemData) return;
        return new Item(itemData.id_item, itemData.category, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
    }

}