require("dotenv").config()
const nodemailer = require("nodemailer");

const MAIL_ID = process.env.MAIL_ID;
const PWD = process.env.PWD;
const BASE_URL = "http://localhost:3040"

const sender = MAIL_ID;
const receiver = "ruchinov@yahoo.com";
const CC = []
const BCC = [];
const subject = "This is an automated email"
const EMAIL_HTML = "<html>\n" +
    "      <head>\n" +
    "        <style>\n" +
    "          /* CSS styles for the email body */\n" +
    "          body {\n" +
    "            background-color: #f2f2f2;\n" +
    "            font-family: Arial, sans-serif;\n" +
    "            color: #333333; display: flex; justify-content: center;\n" +
    "          }\n" +
    "\n" +
    "          h1 {\n" +
    "            color: #ff0000;\n" +
    "          }\n" +
    "\n" +
    "          p {\n" +
    "            font-size: 16px;\n" +
    "          }\n" +
    "        </style>\n" +
    "      </head>\n" +
    "      <body>\n" +
    "       <img src=`http://localhost:3040/tracking-pixel` width='1' height='1' alt='Tracking Pixel'>\n" +
    "        <h1>Automated Email Sent via my Server!</h1>\n" +
    "        <p>This email should send itself twice</p>\n" +
    "      </body>\n" +
    "    </html>"

const options = {
    from: sender,
    to: receiver,
    cc: CC,
    bb: BCC,
    subject: subject,
    html: EMAIL_HTML
}

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
        user: MAIL_ID,
        pass: PWD
    }
})

module.exports = {transporter, options}