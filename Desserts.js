export default class Desserts {
    constructor(id,name, price, amount) {
        this.id = id;
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
