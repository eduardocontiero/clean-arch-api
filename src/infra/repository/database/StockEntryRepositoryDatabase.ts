import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import DbConnection from "../../database/DbConnection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

	constructor (readonly connection: DbConnection) {
	}

	async getByIdItem(idItem: number): Promise<StockEntry[]> {
		const stockEntriesData = await this.connection.query("select * from order_clean_arch.stock_entry where id_item = ?", [idItem]);
		const stockEntries: StockEntry[] = [];
		for (const stockEntryData of stockEntriesData) {
			stockEntries.push(new StockEntry(stockEntryData.idItem, stockEntryData.operation, stockEntryData.quantity, new Date(stockEntryData.date)));
		}
		return stockEntries;
	}
  
	async save(stockEntry: StockEntry): Promise<void> {
		await this.connection.query("insert into order_clean_arch.stock_entry (id_item, operation, quantity, date) values (?, ?, ?, ?)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity, stockEntry.date]);
	}

	async clear () {
		await this.connection.query("delete from order_clean_arch.stock_entry", []);
	}
}
