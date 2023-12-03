const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: "1d",
    path: logDirectory
});

const development = {
    name: "development",
    asset_path: "./assets",
    session_cookie_key: "somethingsecret",
    db: 'codeial_development',
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "codeial.development.ishaan@gmail.com", // generated ethereal user
            pass: "scebyxmyntysgthp" // generated ethereal password
        }
    },
    google_client_id: "868309701555-nrtu8drd3s75a9vd3gaud1o2iorhus4a.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/user/auth/google/callback",
    jwt_secret: "codeial",
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: "production",
    // asset_path: process.env.CODEIAL_ASSET_PATH,
    asset_path: "./assets",
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, // generated ethereal user
            pass: process.env.CODEIAL_GMAIL_PASSWORD // generated ethereal password
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }

}

module.exports = development;

// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT)

// module.exports = eval(process.env.NODE_ENV) == production ? production : development