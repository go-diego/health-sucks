import {Base64} from "js-base64";
import fetch from "isomorphic-unfetch";

export default class Fitbit {
    constructor(clientId, secret, accessToken) {
        this.BASE_URL = "https://api.fitbit.com/1/user/-";
        this.AUTHORIZATION_URL = "https://www.fitbit.com/oauth2/authorize";
        this.TOKEN_URL = "https://api.fitbit.com/oauth2/token";
        this.TOKEN_EXPIRATION = 31536000;
        this.CLIENT_ID = clientId;
        this.ACCESS_TOKEN = accessToken;
        this.CLIENT_SECRET_ENCODED = Base64.encode(`${clientId}:${secret}`);
        this.REDIRECT_URL = encodeURIComponent(`${process.env.APP_DOMAIN}/consent`);
        this.AUTH_HEADER = {
            Authorization: accessToken ? `Bearer ${accessToken}` : ""
        };
    }

    getConsentUrl() {
        const url = `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${
            this.CLIENT_ID
        }&redirect_uri=${this.REDIRECT_URL}&state=${
            this.CLIENT_ID
        }&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=${
            this.TOKEN_EXPIRATION
        }`;
        return url;
    }

    async getActivities() {
        const response = await fetch(`${this.BASE_URL}/activities.json`, {
            headers: {...this.AUTH_HEADER}
        });
        return response.json();
    }

    async getFrequentActivities() {
        const response = await fetch(`${this.BASE_URL}/activities/frequent.json`, {
            headers: {...this.AUTH_HEADER}
        });
        return response.json();
    }

    async getWeekHeartRate() {
        const response = await fetch(`${this.BASE_URL}/activities/heart/date/today/1w.json`, {
            headers: {...this.AUTH_HEADER}
        });
        return response.json();
    }

    async getDevices() {
        const response = await fetch(`${this.BASE_URL}/devices.json`, {
            headers: {...this.AUTH_HEADER}
        });
        return response.json();
    }
}
