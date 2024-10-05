import { getDB } from "../../public/config/db.js";

export default class ContactModel {

    constructor({ name, email, message, mobile }) {
        this.name = name  ;
        this.email = email;
        this.message = message;
        this.mobile = mobile;
    }

    static async tableName() {
        const db = await getDB();
        return db.collection('contacts'); 
    }    

    static async save(contactData) {
        const collection = await this.tableName();
        const contact = {
            name: contactData.name,
            email: contactData.email,
            message: contactData.message,
            mobile: contactData.mobile,
            ip: contactData.ip,
            createdAt: new Date().toISOString() 
        };
        return await collection.insertOne(contact);
    }

}
