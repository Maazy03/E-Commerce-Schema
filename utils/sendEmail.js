const nodemailer=require('nodemailer')  

const sendEmail = async (options) => {
console.log("FUNCTION")
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL, // generated ethereal user
        pass: process.env.SMTP_PASSWORD // generated ethereal password
    },
});
console.log("FUNCTION2",options)

// send mail with defined transport object
let message = {
    // from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    from:'"MAAZ" <muhammadmaaz46"gmail.com>',
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
};

console.log("FUNCTION3")

const info = await transporter.sendMail(message)
console.log("Message sent: %s", info.messageId);

}

module.exports=sendEmail 