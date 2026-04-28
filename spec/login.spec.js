const LoginPage = require('../pages/loginPage');
const { GmailPage } = require('../pages/GmailPage');
const loginData = require('../data/loginData.json');

describe('Login Test', () => {

    it('Verify user login', async () => {

        const login = new LoginPage(); // ✅ FIX

        await login.navigate();

        await login.login(loginData.username);

        await browser.pause(10000);

        const gmail = new GmailPage();

        const otp = await gmail.getOTP(
            loginData.username,
            loginData.gmailPassword
        );

        await login.writeOTPandSubmit(otp);
    }).timeout(180000);

});
