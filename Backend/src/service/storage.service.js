const ImageKit = require("imagekit");
const { response } = require("../app");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});



// app.use(express.json())


async function uploadFiles(file,fileName){

  

    try {
        const response = await imagekit.upload({
            file: file.buffer,
            fileName:fileName,
            folder: "moodyplayer",

        });
        return response;
      }catch (error) {
          console.error("Error uploading file:", error);
          throw error;
      }

    

}


module.exports = uploadFiles;