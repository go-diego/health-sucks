const ENV_PATH = process.env.NODE_ENV === "production" ? "./.env.production" : "./.env.development";

require("dotenv").config({path: ENV_PATH});

module.exports = {
    "process.env.FIREBASE_KEY": process.env.FIREBASE_KEY,
    "process.env.FIREBASE_AUTH_DOMAIN": process.env.FIREBASE_AUTH_DOMAIN,
    "process.env.FIREBASE_DB_URL": process.env.FIREBASE_DB_URL,
    "process.env.FIREBASE_PROJECT_ID": process.env.FIREBASE_PROJECT_ID,
    "process.env.FIREBASE_BUCKET": process.env.FIREBASE_BUCKET,
    "process.env.FIREBASE_MESSAGING_SENDER_ID": process.env.FIREBASE_MESSAGING_SENDER_ID,
    "process.env.APP_DOMAIN": process.env.APP_DOMAIN
};
