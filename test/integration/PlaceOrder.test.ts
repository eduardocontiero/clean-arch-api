import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import MysqlConnectionAdapter from "../../src/infra/database/MysqlConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";


let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;


beforeEach(function () {
    const connection = MysqlConnectionAdapter.getInstance();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const couponRepository = new CouponRepositoryDatabase(connection);
    orderRepository = new OrderRepositoryDatabase(connection);

    placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
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