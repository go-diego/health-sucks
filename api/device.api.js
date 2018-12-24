import {firestore} from "../api/firebase.api";

export default class Devices {
    constructor() {
        this.db = firestore;
    }

    async getAll() {
        const devicesRef = await this.db.collection("devices").get();
        return devicesRef.docs.map(device => {
            return {
                ...{id: device.id},
                ...device.data()
            };
        });
    }

    async set(id, dto, merge = true) {
        return await this.db
            .collection("devices")
            .doc(id)
            .set(dto, merge);
    }
}
