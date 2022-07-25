import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
        {
                fullName: {type: String, required: true},
                address: {type: String, required: true},
                phoneNumber: {type: String, required: true},
                email: {type: String, required: true},
        }
);
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;