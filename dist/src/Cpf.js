"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cpf {
    constructor(value) {
        if (!this.validate(value))
            throw new Error('Invalid cpf');
        this.value = value;
    }
    validate(cpf) {
        if (!cpf)
            return false;
        cpf = this.clean(cpf);
        if (!this.hasMinimumLength(cpf))
            return false;
        if (this.isBlocked(cpf))
            return false;
        const digit1 = this.calculateDigit(cpf, 10);
        const digit2 = this.calculateDigit(cpf, 11);
        const calculateDigit = `${digit1}${digit2}`;
        const actualDigit = cpf.slice(9);
        return actualDigit === calculateDigit;
    }
    clean(cpf) {
        return cpf.replace(/\D/g, '');
    }
    hasMinimumLength(cpf) {
        const [firstDigit] = cpf;
        if (cpf.length !== 11 || [...cpf].every((c) => c === firstDigit))
            return false;
        return true;
    }
    isBlocked(cpf) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }
    calculateDigit(cpf, factor) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1)
                total += parseInt(digit) * factor--;
        }
        const rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    }
}
exports.default = Cpf;
