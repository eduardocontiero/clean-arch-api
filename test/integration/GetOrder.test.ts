import GetOrder from "../../src/application/usecase/get_order/GetOrder";
import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import MysqlConnectionAdapter from "../../src/infra/database/MysqlConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";


let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepository;



beforeEach(function () {
    const connection = MysqlConnectionAdapter.getInstance();
    orderRepository = new OrderRepositoryDatabase(connection);
    const repositoryFactory = new DatabaseRepositoryFactory();
    placeOrder = new PlaceOrder(repositoryFactory);
    getOrder = new GetOrder(repositoryFactory);
});

test("Deve obter um pedido pelo código", async function () {


    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
        date: new Date("2024-01-05"),
        coupon: "VALE20"
    }

    const output = await placeOrder.execute(input);
    const getOrderOutput = await getOrder.execute(output.code);
    expect(getOrderOutput.code).toBe("202400000001");

    expect(getOrderOutput.total).toBe(138);
})



afterEach(async function(){
    await orderRepository.clear();
});