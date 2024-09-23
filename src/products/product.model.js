import {getDB} from "../../public/config/db.js";

export default class ProductModel {
    constructor(id, name, desc, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    static async tableName() {
        const db = await getDB();
        return db.collection('products');
    }

    // Get all products from the database
    static async getAllProducts() {
        const collection = await this.tableName();
        const products = await collection.find().toArray();  // Fetch all products
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
            newProduct.imageUrl
        );
        await collection.insertOne(product);  // Insert new product into the database
    }

    // Find product by ID
    static async getProductById(id) {
        const collection = await this.tableName();
        const product = await collection.findOne({ id: parseInt(id, 10) });
        return product || false;
    }

    // Update a product in the database
    static async updateProduct(updatedProduct) {
        const collection = await this.tableName();
        const result = await collection.updateOne(
            { id: parseInt(updatedProduct.id, 10) },
            { $set: updatedProduct }
        );
        return result.modifiedCount > 0;
    }

    // Delete a product from the database
    static async deleteProduct(id) {
        const collection = await this.tableName();
        const result = await collection.deleteOne({ id: parseInt(id, 10) });
        return result.deletedCount > 0;
    }
}

