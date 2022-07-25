import db from '../../data/db';
import Contact from '../../models/Contacts';
import data from '../../data/contactData';

const handler = async (req, res) => {
        await db.connect();
        await Contact.deleteMany();
        await Contact.insertMany(data.contactData)
        res.send({message: 'seeded successfully'})
}
export default handler;