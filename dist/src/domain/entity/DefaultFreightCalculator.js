"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultFreightCalculator {
    calculate(item) {
        if (!item.width || !item.height || !item.length || !item.weight)
            return 0;
        const freight = (1000 * item.getVolume() * (item.getDensity() / 100));
        const minFreight = 10;
        return Math.max(minFreight, freight);
    }
}
exports.default = DefaultFreightCalculator;
