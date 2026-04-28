class AddProductPage {

    get option() {
        return $("//a[text()='TECH THRIFTS']");
    }

    get smartphones() {
        return $("//a[text()='Smartphones']");
    }

    get product() {
        return $('//img[@alt="Xiaomi Redmi Note 14 Pro 5G 512GB 12GB RAM Sand Gold Dual Sim Smartphone"]');
    }

    get addtocart() {
        return $('//button[text()="Add to Cart"]');
    }

    get checkoutButton() {
        return $("[href='//uae.sharafdg.com/checkout/']"); 
    }

    async selectOption() {
        await this.option.moveTo();
    }

    async selectSmartPhone() {
        await this.smartphones.click();
    }

    async selectProduct() {
        await this.product.click();
    }

    async AddToCart() {
        await this.addtocart.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = new AddProductPage();
