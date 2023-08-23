import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const router = express.Router();

//openai just updated to v4.2 and is still working out the kinks -- not using it
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req,res) =>{
    res.status(200).json({ message: " dalle routes"})
});

router.route('/').post(async(req,res) =>{
    try{
        const { prompt } = req.body;

        //TO make this work your openai account must enough money for billing
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "User-Agent":"Firefox"
            },
            body: JSON.stringify({
        prompt: prompt,
                n: 1,
                size: '1024x1024',
            })
        
    });

        const data = await response.json();
        
        console.log(data)
        const image = data.data[0].url;

        res.status(200).json({photo: image});


    }catch(err){
        console.error(err);
        res.status(500).json({message:"something went wrong"})
    }
})

export default router;