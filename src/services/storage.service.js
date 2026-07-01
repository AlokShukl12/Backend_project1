const {ImageKit} = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
    privateKey : process.env.PRIVATE_IMAGEKIT
})

async function uploadFile(file) {
    const result = await ImageKitClient.files.upload({
        file,
        fileName : "music_"+ Date.now(),
        folder : "bakAuthPro"
    })
    return result;
}

module.exports = {uploadFile}