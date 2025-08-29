const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_Endpoint,
});

async function uploadFile(file, fileName) {
  const response = await imagekit.upload({
    file: file,
    fileName: fileName,
    folder : "cohort-ai-social"
  });

  return response;
}

module.exports = uploadFile