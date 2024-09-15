export default class ProductModel {
    constructor(id, name, desc, price, url) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.url = url;
    }

    // Example static method to get all products
    static getAllProducts() {
        return products;
    }
    static addProduct(newProduct){
         var product_new=new ProductModel(products.length+1, newProduct.name,  newProduct.desc,  newProduct.price, newProduct.url);
         products.push(product_new);
    }

    static getProductById(id){

        id = parseInt(id, 10);
        // Find the product by id
        const product = products.find(product => product.id === id);

        // console.log(id);
        console.log(product);

        if (product != null) {
            return product;
        } else {
            return false;
        }
    }

    static updateProduct(ProudctIsUpdated){
        ProudctIsUpdated.id = parseInt(ProudctIsUpdated.id, 10);
        const index = products.findIndex(product => product.id === ProudctIsUpdated.id);
        console.log(index);
        if(index){
        products[index]=ProudctIsUpdated;
        return true;
        }else{
            return false;
        }
    }
    static deleteProduct(id) {
        id = parseInt(id, 10);
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
    
}

// Array to hold product instances
 var products = [
    new ProductModel(1, 'iphone', 'Read human thoughts', 2342, 'https://m.media-amazon.com/images/I/313Cl7yn9rL._SY445_SX342_QL70_FMwebp_.jpg'),
    new ProductModel(2, 'Psychology', 'All about nature', 2342, 'https://m.media-amazon.com/images/I/41-OnIuKflL._SX342_SY445_.jpg'),
    new ProductModel(3, 'Maths', 'Everything is calculating', 2342, 'https://m.media-amazon.com/images/I/61HrYF1O3tL._SY466_.jpg'),
    new ProductModel(4, 'Economics', 'All about financial', 2342, 'https://m.media-amazon.com/images/I/51FnaPKuNBL._SY445_SX342_.jpg')
];
