const express=require('express');
const app=express();
const fileupload=require('express-fileupload'); //middleware for uploading files on server
const dbConnect=require('./config/database');
const cloudinaryConnect=require('./config/cloudinary');
const Upload=require('./routes/FileUpload');

require('dotenv').config();

const PORT=process.env.PORT||4000;

app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use("/api/v1/upload/",Upload);

dbConnect();
cloudinaryConnect();

app.listen(PORT,()=>{
    console.log("App is running on PORT "+PORT);
})
