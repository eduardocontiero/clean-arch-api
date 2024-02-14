import Coupon from "../../../src/domain/entity/Coupon";

test("Deve criar um cupom de desconto válido", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2024-12-10"));
    const today = new Date("2022-08-08");
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
});

test("Deve criar um cupom de desconto expirado", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2023-03-01"));
    const today = new Date("2024-02-14");
    const isExpired = coupon.isExpired(today);
    expect(isExpired).toBeTruthy();
});

test("Deve criar um cupom de desconto válido e calcular o desconto", function () {
    const coupon = new Coupon("VALE20", 20);
    const discount = coupon.calculateDiscount(1000);
    expect(discount).toBe(200);
});
