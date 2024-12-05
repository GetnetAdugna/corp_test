import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

const IMAGE_UPLOAD_URL = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL as string;
const RUNPOD_API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY as string;

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

// Function to upload image to the API directly from the client side
export async function uploadImageToApi(imageFile: File): Promise<UploadResult> {
  const imageBuffer = await imageFile.arrayBuffer();
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
      if (respJson.status === 'COMPLETED' && respJson.output?.image?.length) {
        const base64Images = Buffer.from(String(respJson.output.image), 'base64').toString('base64');
        return {
          message: 'Image uploaded and processed successfully',
          image: base64Images,
        };
      } else {
        return { message: 'Error: No model output or request is not completed' };
      }
    } else {
      return { message: `Error: ${response.status} ${response.data}` };
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return { message: 'Error uploading image' };
  }
}
