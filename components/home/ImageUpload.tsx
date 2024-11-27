'use client';
import { headerFont } from '@/data/config/fonts';
import Image from '@/components/shared/Image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/shared/ui/input';
import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { useRef, useState, useEffect } from 'react';
import AddImage from '../../assets/images/add_image.png';
import { ImageViewer } from './ImageViewer';
import axios from 'axios';
import usePersistStore from 'helper/usePersistStore';
import { useUploadStore, type ImageData } from 'store/UploadStore';
import {
  type WithAuthenticatorProps,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { uploadData, getUrl } from "aws-amplify/storage";
import { uploadImageToApi } from './api';

Amplify.configure(outputs);

// Generating the client
const client = generateClient<Schema>({
  authMode: "userPool",
});

type UserImages = Schema["UserImages"]["type"];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const FormSchema = z.object({
  file:
    typeof window !== 'undefined' && window.FileList
      ? z
        .instanceof(FileList)
        .optional()
        .refine(
          (files) => {
            return !files || (files[0] && files[0].size <= MAX_FILE_SIZE);
          },
          {
            message: 'File size should not exceed 5MB',
          },
        )
      : z.any(),
});

const ImageUpload = ({ user }: WithAuthenticatorProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const userData = await response.json();
          setAuthenticated(userData);
        } else {
          console.error('Failed to fetch user data:', response.status);
          setAuthenticated(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAuthenticated(null);
      }
    };

    fetchUserData();
  }, []);

  console.log("Auth User: ", authenticated)

  const store = usePersistStore(useUploadStore, (state) => state);

  // Function to handle the image upload and API call
  const uploadImage = async (imageFile: File) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      console.log('API Called');
      const response = await uploadImageToApi(imageFile);

      if (response.image) {
        console.log('Image Upload successful');
        // Call your function with the original and processed images
        createNewImageUploadData(imageFile, response.image);
      } else {
        console.error('API Image Upload Failed:', response.message);
        setErrorMessage(response.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Unknown Error:', error);
      setErrorMessage('Error uploading image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const imageFile = files[0];
      setSelectedImage(URL.createObjectURL(imageFile));
      uploadImage(imageFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files);
      form.setValue('file', files);
    }
  };

  const handleDelete = (id: number) => {
    store?.removeImageFromList(id);
  };

  const handleRetry = () => {
    setSelectedImage(null);
  }

  const createNewImageUploadData = async (uploadedImage: File, generatedImage: string) => {
    const uploadImageToStorage = async (image: File | string, folder: string) => {
      const result = await uploadData({
        path: ({ identityId }) => `${folder}/${identityId}/${typeof image === 'string' ? image : image.name}`,
        data: image,
      }).result;
      return result?.path;
    };
    const uploadImageToGenerateStorage = async (image: string, folder: string) => {
      // Convert base64 string to a Blob or Buffer
      const buffer = Buffer.from(image, 'base64');
      const fileName = `${Date.now()}_image.png`;

      const result = await uploadData({
        path: ({ identityId }) => `${folder}/${identityId}/${fileName}`,
        data: buffer,
      }).result;
      return result?.path;
    };

    const [uploadedImagePath, generatedImagePath] = await Promise.all([
      uploadImageToStorage(uploadedImage, 'uploaded_images'),
      uploadImageToGenerateStorage(generatedImage, 'generated_images')
    ]);

    // Create the API record
    await client.models.UserImages.create({
      uploadedUrl: uploadedImagePath,
      generatedUrl: generatedImagePath
    });

    const [uploadedSignedInURL, generatedSignedInURL] = await Promise.all([
      getUrl({ path: uploadedImagePath }),
      getUrl({ path: generatedImagePath })
    ]);

    console.log("Uploaded normal image URL: ", uploadedSignedInURL.url.toString())
    console.log("Uploaded generated image URL: ", generatedSignedInURL.url.toString())
    setProcessedImage(generatedSignedInURL.url.toString());
    setSelectedImage(uploadedSignedInURL.url.toString());

    const newImageData: ImageData = {
      selectedImage: uploadedSignedInURL.url.toString(),
      returnedImage: generatedSignedInURL.url.toString(),
      error: '',
      id: Date.now()
    };

    store?.addImageToList(newImageData)
    setProcessedImage(null);
    setSelectedImage(null);
    setErrorMessage('');
  }

  return (
    <div className="w-full flex flex-col items-center fancy-overlay space-y-8 pb-36">
      <div className="flex justify-center items-center">
        <h1
          className={`${headerFont.className} text-5xl sm:text-6xl font-bold tracking-tight text-white text-center inline-flex`}
        >
          Upload an image
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })} className="w-full p-10">
          <div className="flex justify-center items-center">
            <div
              className={`bg-none border ${store?.imagesList.length === 0 ? 'p-12' : 'p-2'
                } rounded-xl shadow-lg sm:w-96 max-w-xl relative flex flex-col justify-center items-center gap-6 ${isDragging ? 'border-blue-500' : 'border-gray-300'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {store?.imagesList.length === 0 && (
                <Image
                  src={AddImage}
                  alt="add image icon"
                  height={150}
                  width={150}
                  className="group-hover:animate-wiggle "
                />
              )}

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Button
                        type="button"
                        className="w-full py-7 text-white rounded-lg transition duration-300 ease-in-out font-semibold"
                        onClick={handleButtonClick}
                      >
                        Upload
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,image/jpg,image/jpeg,image/png"
                        ref={(e) => {
                          fileInputRef.current = e;
                          field.ref(e);
                        }}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          handleFileChange(e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {store?.imagesList.length === 0 && (
                <p className="text-center text-gray-400 mb-6">
                  or drag and drop images
                </p>
              )}
            </div>
          </div>
        </form>
      </Form>
      {
        selectedImage && <ImageViewer
          selectedImage={selectedImage}
          returnedImage={processedImage}
          isLoading={isLoading}
          errorMessage={errorMessage}
          firstPick={true}
          handleRetry={handleRetry}
        />
      }
      {store?.imagesList.map((data, index) => (
        <div key={index} className="relative border">
          <ImageViewer
            selectedImage={data.selectedImage}
            returnedImage={data.returnedImage}
            isLoading={false}
            errorMessage={data.error}
          />
          <button
            className="absolute top-0 right-0 p-2 text-white"
            onClick={() => handleDelete(data.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};


export default withAuthenticator(ImageUpload)