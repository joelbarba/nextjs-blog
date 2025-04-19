import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({ region: 'eu-north-1' });
// jb-default-bucket.s3.eu-north-1.amazonaws.com

export async function saveImage(image, fileName) {
  const bufferedImage = await image.arrayBuffer();

  console.log('SAVING IMAGE to AWS S3');
  console.log('fileName=', fileName);
  console.log('image.type=', image.type);

  s3.putObject({
    Bucket: 'jb-default-bucket',
    Key: 'images/' + fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: image.type,
  });
}

