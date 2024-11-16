export default class Desserts {
    constructor(name, price, amount) {
        this.name = name;
        this.price = parseFloat(price.replace(/[^0-9.]/g, '')).toFixed(2);
        this.amount = amount;
        this.subtotal = parseFloat(this.amount * this.price).toFixed(2)
    }

    decreaseAmount() {
        if (this.amount > 0) {
            this.amount--;
            this.subtotal = parseFloat(this.amount * this.price).toFixed(2)
        }
    }

    increaseAmount() {
        this.amount++;
        this.subtotal = parseFloat(this.amount * this.price).toFixed(2)
    }
}
