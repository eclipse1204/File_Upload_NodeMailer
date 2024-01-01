const mongoose=require('mongoose');
const nodemailer=require('nodemailer');

require('dotenv').config();

const fileSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    imageUrl:{
        type:String,
    },

    tags:{
        type:String,
    },

    email:{
        type:String,
    }
});

//in between the schema and model
fileSchema.post("save",async function(doc){
    try{
        console.log(doc);

        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            } 
        })

        let info=await transporter.sendMail({
            from:"Juvaraj Bhattacharjee - ECLIPSE_1204",
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:"<h1>Hello JB</h1><h2>File Uploaded</h2>"
        });
        console.log(info);
    }
    catch(error){
        console.log(error);
    }
})

module.exports=mongoose.model("File",fileSchema);