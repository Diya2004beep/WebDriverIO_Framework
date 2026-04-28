const imaps = require('imap-simple'); //Importing library 

class GmailPage { //creating a class for email operation only
  constructor() {
    // No page object since this is API-based
  }

  async getOTP(email, password) {  //1. connect to gmail, 2. read latest email, 3. find otp in email and get it back
    try {
      console.log(`Attempting to fetch OTP for email: ${email}`);

      const config = {     //gmail server configuration
        imap: {
          user: email,
          password: password,
          host: 'imap.gmail.com',
          port: 993,
          tls: true,
          autotls: 'always',
          tlsOptions: {          //TLS security settings (ensure secure encrypted connection)
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2'
          },
          authTimeout: 10000,             // if gmail does not reply in 10sec it throws error
          socketTimeout: 10000
        }
      };

      const connection = await imaps.connect(config);   //connect to gmail (Logs into gmail, opens IMAP session)
      console.log('Connected to Gmail IMAP');
      
      await connection.openBox('INBOX');   //open inbox

      const searchCriteria = [      //search email condition. see only unseen emails. mail recieved in last 10min
        ['UNSEEN'],
        ['SINCE', new Date(Date.now() - 10 * 60 * 1000)] // Last 10 minutes
      ];

      const messages = await connection.search(searchCriteria, { 
        bodies: ['HEADER', 'TEXT'],  //reads email subject and email body
        markSeen: false              //do not mark the email as read
      });

      if (messages.length === 0) {           // if no email found
        throw new Error('No recent unseen emails found in INBOX');
      }

      console.log(`Found ${messages.length} unread email(s)`);

      // Get the latest message if there are multiple mails present
      const latestMessage = messages[messages.length - 1];
      const textPart = latestMessage.parts.find(part => part.which === 'TEXT');   //email have parts(header, attachment,body) it finds body text
      
      if (!textPart) {
        throw new Error('No text part found in email');
      }

      const body = textPart.body;

      // Extract OTP - try multiple patterns. This is done using Rgex 
      let otpMatch = body.match(/\b(\d{6})\b/);  //\d digit. Extract only 6 digits
      if (!otpMatch) {
        otpMatch = body.match(/code[:\s]+(\d{6})/i);
      }
      if (!otpMatch) {
        otpMatch = body.match(/otp[:\s]+(\d{6})/i);
      }
      if (!otpMatch) {
        otpMatch = body.match(/(\d{6})/);
      }

      if (!otpMatch) {   // if no otp found
        console.log('Email body:', body.substring(0, 500));
        throw new Error('OTP not found in email');
      }

      const otp = otpMatch[1] || otpMatch[0];
      console.log(`✓ OTP fetched from Gmail: ${otp}`);

      await connection.end();  //close gmail connection
      return otp;
      
    } catch (error) {
      console.error('❌ Error fetching OTP:', error.message);
      console.error('Full error:', error);
      
      if (error.message.includes('ALERT') || error.textCode === 'ALERT') {
        console.error('\n📧 Gmail Security Alert detected!');
        console.error('Steps to fix:');
        console.error('1. Check your Gmail inbox for "Google Account Alert"');
        console.error('2. Go to: https://accounts.google.com/signin/security-check');
        console.error('3. Click "Yes, it\'s me" to approve the access');
        console.error('4. Wait 30 seconds and try again\n');
      }
      
      if (error.message.includes('Authentication failed')) {
        console.error('\n🔑 Authentication Failed!');
        console.error('Make sure you are using an App Password, not your regular password');
        console.error('Get App Password: https://myaccount.google.com/apppasswords\n');
      }
      
      throw error;
    }
  }
}

module.exports = { GmailPage };  //export class