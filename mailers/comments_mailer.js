const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    // console.log("Inside the newComment mailer");

    let htmlString = nodemailer.renderTemplate({ comment: comment },'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: "codeial.development.ishaan@gmail.com",
        to: comment.user.email_id,
        subject: "New comment published",
        // html: "<h1>Dear user, your comment was published</h1>"
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log(`Error in sending the email!\n Error code-${err}`);
            return;
        }
        // console.log("Email sent", info);
        return;
    });
}
