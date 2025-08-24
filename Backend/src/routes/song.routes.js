const express = require('express');
const multer = require('multer');
const app = require('../app')
const songModal = require('../models/song.model')
const { v4: uuid } = require('uuid')
const uploadFiles = require('../service/storage.service')
const router = express.Router();



const upload = multer({storage: multer.memoryStorage()});



router.post('/songs', upload.single("audio"),async(req,res)=>{

 
const file = req.file
 
const fileName = `${uuid()}-${file.originalname}`;
const fileData = await uploadFiles(file, fileName);

// console.log(fileData);
const songs = await songModal.create({
    title: req.body.title,
    artist: req.body.artist,
    audio: fileData.url,
    mood: req.body.mood
})

// console.log(req.body);
// console.log(req.file);


res.status(201).json({


     message: "File uploaded successfully",
     song: songs,
     fileData

});
     


});

router.get('/songs',async(req,res)=>{
  
    const {mood} = req.query;

    const song =  await songModal.find({
        mood: mood
    })

    res.status(200).json({
        meassage: "song fetch successfully",
        song
    })
})



module.exports = router;