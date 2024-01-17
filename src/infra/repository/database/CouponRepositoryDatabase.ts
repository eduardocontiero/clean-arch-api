import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import DbConnection from "../../database/DbConnection";

export default class CouponRepositoryDatabase implements CouponRepository {


    constructor(readonly connection: DbConnection) { }

    async findByCode(code: string): Promise<Coupon | undefined> {
        const [couponData] = await this.connection.query("select * from order_clean_arch.coupon where code = ? ", [code]);
        if (!couponData) return;

        return new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
    }

}