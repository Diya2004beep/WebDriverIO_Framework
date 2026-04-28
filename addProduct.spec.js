const AddProductPage = require('../pages/AddProductPage');
const { loginToApplication } = require('../util/loginHelper');

describe('Login and verify product', () => {

    it('should login and add product to cart', async () => {

        await loginToApplication();

        await AddProductPage.selectOption();
        await AddProductPage.selectSmartPhone();
        await AddProductPage.selectProduct();
        await AddProductPage.AddToCart();
        await AddProductPage.checkout();

    });

});