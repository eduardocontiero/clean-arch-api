import OrderCode from "../../src/domain/entity/OrderCode";

test('Dever criar um codigo de pedido', function(){
    const date = new Date("2024-01-10");
    const sequence = 1;
    
    const orderCode = new OrderCode(date, sequence);
    const value = orderCode.value;

    expect(value).toBe("202400000001");
})