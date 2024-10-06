import ProductModel from "../models/product.model.js";
import ContactModel from "../models/contact.model.js";

export default class ContactController {

  async contactUser(req, res) {

        if (req.method !== 'POST') {
            return res.render('contact/create');
        }

    try {

        const { name, email, mobile, message } = req.body;
        const contactData = {
            name,
            email,
            mobile,
            message,
            ip: req.ip, 
        };

        await ContactModel.save(contactData);

        const products = await ProductModel.getAllProducts();

        return res.status(200).render('product', {
            products,
            message: 'Contact information and product updated successfully',
        });

    } catch (error) {
        console.error('Error while saving contact:', error);
        return res.status(500).send('Server error');
    }
    
  }

}
