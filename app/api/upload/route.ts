import { NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

const IMAGE_UPLOAD_URL = process.env.IMAGE_UPLOAD_URL as string;
const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY as string;

export interface ApiResponse {
  status: string;
  output?: {
    image: string[];
  };
}
interface UploadResult {
  message: string;
  image?: string;
}

// Function to upload image to the API
async function uploadImageToApi(
  imageBuffer: ArrayBuffer,
): Promise<UploadResult> {
  const imageContent = Buffer.from(imageBuffer).toString('base64');
  const payload = { input: { image_file: [imageContent] } };

  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      IMAGE_UPLOAD_URL,
      payload,
      {
        headers: {
          Authorization: `Bearer ${RUNPOD_API_KEY}`,
        },
      },
    );

    if (response.status === 200) {
      const respJson = response.data;
      if (respJson.status === 'COMPLETED' && 'output' in respJson) {
        const images = respJson.output?.image;
        if (images && images.length > 0) {
          const base64Images = Buffer.from(String(images), 'base64').toString('base64');
          return {
            message: 'Image uploaded and processed successfully',
            image: base64Images,
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
    console.error(error);
    return { message: 'Error uploading image' };
  }
}

export async function POST(req: Request): Promise<NextResponse> {
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

    // Convert File to Buffer and save the image to the public folder
    const imageBuffer = await imageFile.arrayBuffer();

    // Now use the saved image for API call
    const result: UploadResult = await uploadImageToApi(imageBuffer);

    return NextResponse.json({ ...result }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Error uploading image' },
      { status: 500 },
    );
  }
}
