const twilio = require('twilio');
const accountSid = "AC922f89cb8ccd6d6a0e59289cd877147e";
const authToken = "a26f7d4f1eb670edc22d75977685d3f3";
const client = new twilio(accountSid, authToken);

// +18066022864

const sendOtp = async (phone_number) => {

    let otp_status = await client.verify.services('VA86d89e649e33e18c89a86532c3594984')
                 .verifications
                 .create({to: `+91${phone_number}`, channel: 'sms'})
                //  .then(verification => {return await verification.status});
    return otp_status.status

    // while((otp_status == undefined)) {
    //     require('deasync').runLoopOnce();
    // }

    // return otp_status;
}


module.exports = sendOtp;



