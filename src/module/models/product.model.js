import { getDB } from "../../../public/config/db.js";


export default class ProductModel {
    static  CONTACT_US="CONTACT_US";
    // Constructor for creating a new product instance
    constructor(id, name, desc, price, imageUrl, contactUs) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.contactUs = contactUs;  // Optional: 'Contact Us' related info
    }

    // Helper method to get the collection/table name
    static async tableName() {
        const db = await getDB(); // Get the MongoDB database instance
        return db.collection('products'); // Return the 'products' collection
    }

    // Fetch all products from the database
    static async getAllProducts() {
        const collection = await this.tableName();
        const products = await collection.find().toArray();  // Convert the result to an array
        return products;
    }

    // Add a new product to the database
    static async addProduct(newProduct) {
        const collection = await this.tableName();
        const product = new ProductModel(
            newProduct.id,
            newProduct.name,
            newProduct.desc,
            newProduct.price,
            newProduct.imageUrl,
            newProduct.contactUs  // Optional: Contact Us info
        );
        await collection.insertOne(product);  // Insert the new product document
    }

    // Find a product by its ID
    static async getProductById(id) {
        const collection = await this.tableName();
        const product = await collection.findOne({ id: parseInt(id, 10) }); // Find product by integer ID
        return product || false;  // Return product or false if not found
    }

    // Update a product's details in the database
    static async updateProduct(updatedProduct) {
        const collection = await this.tableName();
        const result = await collection.updateOne(
            { id: parseInt(updatedProduct.id, 10) },  // Match product by ID
            { $set: updatedProduct }  // Update the product fields with new values
        );
        return result.modifiedCount > 0;  // Return true if a document was updated
    }

    // Delete a product by its ID
    static async deleteProduct(id) {
        const collection = await this.tableName();
        const result = await collection.deleteOne({ id: parseInt(id, 10) }); // Delete product by ID
        return result.deletedCount > 0;  // Return true if a document was deleted
    }
}
