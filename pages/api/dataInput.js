//import { connectToDb } from "../../Lib/mongodb";
//import db from "../../data/db";
import { MongoClient } from 'mongodb';
//import { connectToDb } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
    
    export default async function handler(req, res) {
        
        switch (req.method) {
            case 'GET': {
                return getPost(req, res);
            }
            case 'POST': {
                return addPost(req, res);
            }
            case 'PUT': {
                return updatePost(req, res);
            }
            case 'DELETE': {
                return deletePost(req, res);
            }
        }
        async function getPost(req,res){
            try {
                // connect to the database
                const client = await MongoClient.connect(
                        process.env.MONGODB_URI
                    );
                    const db = client.db();
                // fetch the posts
                let posts = await db
                    .collection('contacts')
                    .find({})
                    .sort({ _id : -1})
                    .toArray();
                // return the posts
                return res.json({
                    message: JSON.parse(JSON.stringify(posts)),
                    success: true,
                });
              
            } catch (error) {
                // return the error
                return res.json({
                    message: new Error(error).message,
                    success: false,
                });
            }
        }
      
        async function addPost(req, res) {
            try {
                // connect to the database
                const client = await MongoClient.connect(
                        process.env.MONGODB_URI
                    );
                    const db = client.db();
                // add the post
                await db.collection('contacts').insertOne(req.body);
                // return a message
                return res.json({
                    message: 'Post added successfully',
                    success: true,
                });
            } catch (error) {
                // return an error
                return res.json({
                    message: new Error(error).message,
                    success: false,
                });
            }
        }
        
        async function deletePost(req, res) {
            try {
                // Connecting to the database
                let { db } = await connectToDb();
                console.log(req.body)
                // Deleting the post
                await db.collection('contacts').deleteOne({
                    _id: new ObjectId(req.query.id),
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
        
        async function updatePost(req, res) {
           
            try {
                // connect to the database
                const client = await MongoClient.connect(
                        process.env.MONGODB_URI
                    );
                    const db = client.db();
    
                // update the published status of the post
                await db.collection('contacts').updateOne(
                    {
                        "_id": ObjectId(req.query._id),
                        "contactName" : req.query.contactName,
                        "address" : req.query.address,
                        "phoneNumber" : req.query.phoneNumber,
                        "email" : req.query.email,
                        //_id: ObjectId(JSON.parse(req.body)._id),
                    },
                    { $set:JSON.parse(req.body) }
                );
        
                // return a message
                return res.json({
                    message: 'Post updated successfully',
                    success: true,
                });
            } catch (error) {
        
                // return an error
                return res.json({
                    message: new Error(error).message,
                    success: false,
                });
            }
        }
    }