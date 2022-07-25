//import { connectToDb } from "../../Lib/mongodb";
//import db from "../../data/db";
import { MongoClient } from 'mongodb';
//import { connectToDb } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
    
    export default async function handler(req, res) {
            
                // connect to the database
                const client = await MongoClient.connect(
                        process.env.MONGODB_URI
                    );
                    const db = client.db();
                    const {fullName, address, phoneNumber, email} = req.body;
                // update the published status of the post
                await db.collection('contacts').updateOne(
                    {
                        "_id": ObjectId(req.query._id),
                    },
                    {fullName, address, phoneNumber, email},
                    {
                       
                        "fullName" : req.body.contactName,
                        "address" : req.body.address,
                        "phoneNumber" : req.body.phoneNumber,
                        "email" : req.body.email,
                        //_id: ObjectId(JSON.parse(req.body)._id),
                    },
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
        
                // return a message
                return res.json({
                    message: "rPost updated successfully",
                    success: true,
                });
            
       
    }