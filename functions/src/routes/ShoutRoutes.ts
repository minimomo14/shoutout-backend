import express from "express";
import {getClient} from "../db";
import ShoutOut from "../models/ShoutOut";

const shoutRoutes = express.Router();

shoutRoutes.get("/shoutOuts",async (req,res) => {
    try {
        const client = await getClient();
        const results = await client.db().collection<ShoutOut>("shoutOuts").find().toArray();
        console.log(results);
        res.json(results);
    } catch (err) {
            console.error("Error", err);
            res.status(500).json({message: "Internal server error"});
            
    }
});

shoutRoutes.post("/shoutOuts",async (req,res) => {
    const item: ShoutOut = req.body as ShoutOut;
    try {
        const client = await getClient();
         await client.db().collection<ShoutOut>("shoutOuts").insertOne(item);
        res.status(201);
        res.json(item);
    } catch (err) {
        console.error("Error", err);
        res.status(500).json({message: "Internal server error"});
    }
});

export default shoutRoutes;