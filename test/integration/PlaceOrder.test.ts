import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

test("Deve fazer um pedido", async function () {
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();

    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
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
    expect(output.total).toBe(88);
})

test("Deve fazer um pedido com cálculo de frete", async function () {
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();

    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
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
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();

    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
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
    
    expect(output.code).toBe("202400000001");
})