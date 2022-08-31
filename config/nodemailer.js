const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// defines who and how the communication is going to take place
let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "codeial.development.ishaan@gmail.com", // generated ethereal user
        pass: "scebyxmyntysgthp" // generated ethereal password
    }
});

// defines the html part of the email
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering the template!\nError code-{$err");
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}