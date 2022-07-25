//import { connectToDb } from "../../Lib/mongodb";
//import db from "../../data/db";
import { MongoClient } from 'mongodb';
//import { connectToDb } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
    
    export default async function handler(req, res) {
        
       
            try {
                // Connecting to the database
                const client = await MongoClient.connect(
                    process.env.MONGODB_URI
                );
                const db = client.db();
                //console.log(req.body)
                // Deleting the post
                await db.collection('contacts').deleteOne({
                    "_id": ObjectId(req.query._id),
                });
        
                // returning a message
                return res.json({
                    message: 'Post deleted successfully',
                    success: true,
                });
            } catch (error) {
        
                // returning an error
                return res.json({
                    message: new Error(error).message,
                    success: false,
                });
            }
        }
        
        
