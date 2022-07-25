
import { MongoClient } from 'mongodb';

import { ObjectId } from 'mongodb';
    
    export default async function handler(req, res) {
            
                // connect to the database
                const client = await MongoClient.connect(
                        process.env.MONGODB_URI
                    );
                    const db = client.db();
                   const {_id, fullName, address, phoneNumber, email} = req.body;
                // update the published status of the post
                await db.collection('contacts').updateOne(
                    {
                        _id: ObjectId(_id),
                    },
                    { $set:
                    {"fullName": fullName, "address": address, "phoneNumber": phoneNumber, "email": email},
                    }
                    // {
                       
                    //     fullName : req.body.fullName,
                    //     address : req.body.address,
                    //     phoneNumber : req.body.phoneNumber,
                    //     email : req.body.email,
                    //     //"_id": ObjectId(JSON.parse(req.body)._id),
                    // },
                    // [ 
                    //    { $set:
                    //     {campaign : 
                    //         [
                    //             { 'cate1': 'fullName', "cate2": "ldjflads;fj;sa"},
                    //             { 'cate1': 'fullName', "cate2": "ldjflads;fj;sa"},
                    //         ]
                    //     }
                    //     } 
                    // ]
                );
        
                return res.json({
                    message: "rPost updated successfully",
                    success: true,
                });
            
       
    }