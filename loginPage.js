class LoginPage {

    get userName() {
        return $('input[placeholder="Please enter email address"]');
    }

    get nextButton() {
        return $('input[name="login"]');
    }

    get loginButton() {
        return $('#login_with_otp');
    }

    async navigate() {
        await browser.url('https://uae.sharafdg.com/my-account/');
    }

    async login(username) {

        await this.userName.waitForDisplayed();
        await this.userName.setValue(username);

        await this.nextButton.click();
    }

    async writeOTPandSubmit(otp) {

    if (!otp) throw new Error('OTP is undefined');

    for (let i = 0; i < otp.length; i++) {

        const digitBox = $(`#loginform #digit${i + 1}`);

        await digitBox.waitForClickable();

        await digitBox.setValue(otp[i]);
    }

    await this.loginButton.click();
}
}

module.exports = new LoginPage();