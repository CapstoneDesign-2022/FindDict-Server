import AWS from "aws-sdk";
import config from ".";

// AWS.config.update({
//   region: "ap-northeast-2",
//   accessKeyId: config.awsAccessKey,
//   secretAccessKey: config.awsSecretKey!
// });

// const s3 = new AWS.S3();

const s3: AWS.S3 = new AWS.S3({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretKey,
  region: "ap-northeast-2"
});

export default s3;
