"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderInput {
    constructor(cpf, orderItems, date, coupon) {
        this.cpf = cpf;
        this.orderItems = orderItems;
        this.date = date;
        this.coupon = coupon;
    }
}
exports.default = PlaceOrderInput;
