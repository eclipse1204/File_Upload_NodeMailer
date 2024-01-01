const File=require('../models/File');
const cloudinary=require('cloudinary').v2;

exports.localFileUpload=async(req,res)=>{
    try{
        const file=req.files.file; // "file" is the name of our file
        console.log(file);
        let path=__dirname+"/files/"+Date.now()+"."+(file.name.split(".")[1]); // current working directory i.e controllers
        console.log(path);
        file.mv(path,(err)=>{
            console.log("ERROR");
            console.log(err);
        })
        res.json({
            success:true,
            message:"Local file uploaded successfully"
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

function isFileTypeSupported(fileType,supportedTypes)
{
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    if(quality)
    {
        options.quality=quality;
    }
    options.resource_type = "auto"; //auto detect file type
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
 
exports.imageUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.imageFile;
        console.log(file);
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format not supported"
            })
        }
        const response=await uploadFileToCloudinary(file,"Juvaraj"); //file and folder name created in Cloudinary
        console.log(response);
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Error in uploading image"
        })
    }
}

exports.videoUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.videoFile;
        console.log(file);
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format not supported"
            })
        }
        const response=await uploadFileToCloudinary(file,"Juvaraj"); //file and folder name created in Cloudinary
        console.log("RESPONSE");
        console.log(response);
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Error in uploading video"
        })
    }
}

exports.imageSizeReducer=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.imageFile;
        console.log(file);
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format not supported"
            })
        }
        const response=await uploadFileToCloudinary(file,"Juvaraj",30); //file and folder name created in Cloudinary
        console.log(response);
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Error in uploading image"
        })
    }
}