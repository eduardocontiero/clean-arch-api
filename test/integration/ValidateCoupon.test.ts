import ValidateCoupon from "../../src/application/usecase/validate_coupon/ValidateCoupon";
import MysqlConnectionAdapter from "../../src/infra/database/MysqlConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";

test("Deve validar um cupom de desconto", async function () {
    const connection = MysqlConnectionAdapter.getInstance();
    const couponRepository = new CouponRepositoryDatabase(connection);
    const validateCoupon = new ValidateCoupon(couponRepository);


    const isValid = await validateCoupon.execute("VALE20");
    expect(isValid).toBeTruthy();
});