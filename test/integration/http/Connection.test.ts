import MysqlConnectionAdapter from "../../../src/infra/database/MysqlConnectionAdapter";

test("Deve criar uma conexão com o banco de dados", async function() {
    const connection = MysqlConnectionAdapter.getInstance();

    const itemsData = await connection.query("select * from order_clean_arch.item", []);
    expect(itemsData).toHaveLength(6);
    
});