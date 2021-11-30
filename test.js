const twilio = require('twilio');


const accountSid = "AC922f89cb8ccd6d6a0e59289cd877147e";
const authToken = "a26f7d4f1eb670edc22d75977685d3f3";

const client = new twilio(accountSid, authToken);

// +18066022864

// client.messages
//   .create({
//     body: 'Hello from surabhi',
//     to: '+917206683371', // Text this number
//     from: '+18066022864', // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));

// console.log("sonmething")
// client.verify.services('VA86d89e649e33e18c89a86532c3594984')
//              .verifications
//              .create({to: '+917206683371', channel: 'sms'})
//              .then(verification => console.log(verification))


client.verify.services('VA86d89e649e33e18c89a86532c3594984')
      .verificationChecks
      .create({to: '+919622572001', code: '104979'})
      .then(verification_check => console.log(verification_check));


