const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'sellme-images';
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true, // Required for CORS support to work
  };

  const uploadFileToS3 = async (fileBinary) => {
    try {
      const base64File = fileBinary;
      const decodedFile = Buffer.from(
        base64File.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      const params = {
        Bucket: BUCKET_NAME,
        Key: `images/${new Date().toISOString()}.jpeg`,
        Body: decodedFile,
        ContentType: 'image/jpeg',
      };
      const uploadResult = await s3.upload(params).promise();
      return uploadResult;
    } catch (e) {
      console.error(e);
    }
  };

  try {
    switch (event.routeKey) {
      case 'PUT /items':
        let requestJSON = JSON.parse(event.body);
        const fileURL = await uploadFileToS3(requestJSON.itemPicture);
        await dynamo
          .put({
            TableName: 'soldby-data',
            Item: {
              itemId: requestJSON.itemId,
              userId: requestJSON.userId,
              itemTitle: requestJSON.itemTitle,
              itemDesc: requestJSON.itemDesc,
              itemLocation: requestJSON.itemLocation,
              itemPrice: requestJSON.itemPrice,
              itemPicture: fileURL.Location,
            },
          })
          .promise();
        body = `Put item ${requestJSON.itemId}`;
        break;
      case 'GET /items':
        let params = {
          TableName: 'soldby-data',
        };
        body = await dynamo.scan(params).promise();
        break;
      default:
        throw new Error(`Unsupported route: ` + `${event.routeKey}`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
