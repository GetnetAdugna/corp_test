import { NextResponse } from 'next/server';
import axios from 'axios';
import { Buffer } from 'buffer';
import path from 'path';
import { promises as fsPromises } from 'fs';

const IMAGE_UPLOAD_URL = process.env.IMAGE_UPLOAD_URL;
const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;

// Function to upload image to the API
async function uploadImageToApi(imageBuffer: ArrayBuffer) {
  const imageContent = Buffer.from(imageBuffer).toString('base64');
  const payload = { input: { image_file: [imageContent] } };

  try {
    const response = await axios.post(`${IMAGE_UPLOAD_URL}`, payload, {
      headers: {
        Authorization: `Bearer ${RUNPOD_API_KEY}`,
      },
    });

    if (response.status === 200) {
      const respJson = response.data;
      if (respJson.status === 'COMPLETED' && 'output' in respJson) {
        const image = respJson.output.image;
        if (image && image.length > 0) {
          // Save the returned image to the output_images folder
          const outputMp = await processAndSaveImage(image, 'output_images');
          return {
            message: 'Image uploaded and processed successfully',
            outputMp,
          };
        } else {
          return { message: 'Error: No image data in the response' };
        }
      } else {
        return {
          message: 'Error: No model output or request is not completed',
        };
      }
    } else {
      return { message: `Error: ${response.status} ${response.data}` };
    }
  } catch (error) {
    console.log(error);
    return { message: 'Error uploading image' };
  }
}

// Function to process and save the image
async function processAndSaveImage(image: string, folder: string) {
  // Decode the base64 image string
  const imageBuffer = Buffer.from(image, 'base64');

  // Set the path for saving the image
  const outputDir = path.join(process.cwd(), 'public', folder);
  const fileName = `${Date.now()}_output_image.png`; // Use timestamp for unique filenames
  const filePath = path.join(outputDir, fileName);

  // Ensure the output folder exists
  await fsPromises.mkdir(outputDir, { recursive: true });

  // Save the image file
  await fsPromises.writeFile(filePath, imageBuffer);

  // Return the path of the saved image
  return fileName;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json(
        { message: 'No image file provided' },
        { status: 400 },
      );
    }

    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        { message: 'Invalid image file' },
        { status: 400 },
      );
    }

    // Save the image to the public/test_images folder
    const publicDir = path.join(process.cwd(), 'public', 'test_images');
    const fileName = `${Date.now()}_${imageFile.name}`;
    const filePath = path.join(publicDir, fileName);

    // Ensure the directory exists
    await fsPromises.mkdir(publicDir, { recursive: true });

    // Convert File to Buffer and save the image to the public folder
    const imageBuffer = await imageFile.arrayBuffer();
    await fsPromises.writeFile(filePath, Buffer.from(imageBuffer));

    // Now use the saved image for API call
    const result = await uploadImageToApi(imageBuffer);

    return NextResponse.json({ ...result, fileName }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Error uploading image' },
      { status: 500 },
    );
  }
}
