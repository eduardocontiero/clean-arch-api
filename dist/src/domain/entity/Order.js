"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const DefaultFreightCalculator_1 = __importDefault(require("./DefaultFreightCalculator"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf, date = new Date(), freightCalculator = new DefaultFreightCalculator_1.default()) {
        this.date = date;
        this.freightCalculator = freightCalculator;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
        this.freight = 0;
    }
    addItem(item, quantity) {
        this.freight += this.freightCalculator.calculate(item) * quantity;
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity));
    }
    addCoupon(coupon) {
        if (coupon.isExpired(this.date))
            return;
        this.coupon = coupon;
    }
    getFreight() {
        return this.freight;
    }
    getTotal() {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= this.coupon.calculateDiscount(total, this.date);
        }
        total += this.getFreight();
        return total;
    }
}
exports.default = Order;
