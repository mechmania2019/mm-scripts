const AWS = require("aws-sdk");

const mongoose = require("mongoose");
const authenticate = require("mm-authenticate")(mongoose);

const { send, buffer } = require("micro");

const s3 = new AWS.S3({
  params: { Bucket: "mechmania2019" }
});

module.exports = authenticate(async (req, res) => {
  const key = (req.url === "/") ? "" : req.url.slice(1);
  await mkdir(COMPILE_DIR);
  const data = s3
      .getObject({ Key: `scripts/${key}` })
      .createReadStream();

  data.pipe(res);
});