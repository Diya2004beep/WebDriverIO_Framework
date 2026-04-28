const LoginPage = require('../pages/loginPage');
const { GmailPage } = require('../pages/GmailPage');
const loginData = require('../data/loginData.json');

async function loginToApplication() {

    // const login = new LoginPage();
    // const gmail = new GmailPage();

    // await login.navigate();

    // await login.login(loginData.username);

    // // WDIO replacement for waitForTimeout
    // await browser.pause(10000);

    // const otp = await gmail.getOTP(
    //     loginData.username,
    //     loginData.gmailPassword
    // );

    // await login.writeOTPandSubmit(otp);
    

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
}

module.exports = { loginToApplication };