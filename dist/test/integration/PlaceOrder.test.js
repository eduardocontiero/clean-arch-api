"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = __importDefault(require("../../src/application/usecase/PlaceOrder"));
const CouponRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/CouponRepositoryMemory"));
const ItemRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/ItemRepositoryMemory"));
const OrderRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/OrderRepositoryMemory"));
test("Deve fazer um pedido", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const itemRepository = new ItemRepositoryMemory_1.default();
        const couponRepository = new CouponRepositoryMemory_1.default();
        const orderRepository = new OrderRepositoryMemory_1.default();
        const placeOrder = new PlaceOrder_1.default(itemRepository, orderRepository, couponRepository);
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
        };
        const output = yield placeOrder.execute(input);
        expect(output.total).toBe(88);
    });
});
test("Deve fazer um pedido com cálculo de frete", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const itemRepository = new ItemRepositoryMemory_1.default();
        const couponRepository = new CouponRepositoryMemory_1.default();
        const orderRepository = new OrderRepositoryMemory_1.default();
        const placeOrder = new PlaceOrder_1.default(itemRepository, orderRepository, couponRepository);
        const cpf = "839.435.452-10";
        const input = {
            cpf,
            orderItems: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 3 },
            ],
            date: new Date("2024-01-05")
        };
        const output = yield placeOrder.execute(input);
        expect(output.total).toBe(6350);
    });
});
