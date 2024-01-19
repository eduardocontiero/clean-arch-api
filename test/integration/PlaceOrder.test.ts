import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import MysqlConnectionAdapter from "../../src/infra/database/MysqlConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";


let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;


beforeEach(function () {
    const connection = MysqlConnectionAdapter.getInstance();
    orderRepository = new OrderRepositoryDatabase(connection);
    const repositoryFactory = new DatabaseRepositoryFactory();

    placeOrder = new PlaceOrder(repositoryFactory);
});

test("Deve fazer um pedido", async function () {

    const cpf = "839.435.452-10";

    const input = {
        cpf,
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
        date: new Date("2024-01-05"),
        coupon: "VALE20"
    }

    const output = await placeOrder.execute(input);
    expect(output.total).toBe(138);
})

test("Deve fazer um pedido com cálculo de frete", async function () {

    const cpf = "839.435.452-10";

    const input = {
        cpf,
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ],
        date: new Date("2024-01-05")
    }

    const output = await placeOrder.execute(input);

    expect(output.total).toBe(6350);
})

test("Deve fazer um pedido com código", async function () {


    const cpf = "839.435.452-10";

    const input = {
        cpf,
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ],
        date: new Date("2024-01-05")
    }

    const output = await placeOrder.execute(input);

    //expect(output.code).toBe("202400000001");
});

afterEach(async function(){
    await orderRepository.clear();
});