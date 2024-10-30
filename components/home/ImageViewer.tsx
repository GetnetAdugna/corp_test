'use client';

import { useState, useEffect } from 'react';
import { ImageCard } from './ImageCard';
import { Modal } from './Modal';
import { Spinner } from '../shared/ui/spinner';
import { Button } from '../shared/ui/button';

interface ImageViewerProps {
  selectedImage: string;
  returnedImage: string | null;
  isLoading: boolean;
  errorMessage: string;
  firstPick?: boolean;
  handleRetry?: () => void;
}

export const ImageViewer = ({
  selectedImage,
  returnedImage,
  isLoading,
  errorMessage,
  firstPick,
  handleRetry
}: ImageViewerProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
  const [selectedImageInfo, setSelectedImageInfo] = useState<{
    width: number;
    height: number;
    size: string;
  } | null>(null);
  const [returnedImageInfo, setReturnedImageInfo] = useState<{
    width: number;
    height: number;
    size: string;
  } | null>(null);
  const [retry, setRetry] = useState(false);

  const imageLocation = `${firstPick ? `${selectedImage}` : `${selectedImage}`}`;

  const openModal = (selectedImage: string) => {
    setModalImageSrc(selectedImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc(null);
  };

  // Function to get image details
  const getImageDetails = (
    imageSrc: string,
    callback: (info: { width: number; height: number; size: string }) => void,
  ) => {
    const img = new window.Image();
    img.src = imageSrc;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const fileSize = 500000; // Example file size
      const readableSize = (fileSize / 1024).toFixed(2) + ' KB'; // Convert bytes to KB

      callback({ width, height, size: readableSize });
    };
  };

  // Get details for the selected image
  useEffect(() => {
    if (selectedImage) {
      getImageDetails(imageLocation, setSelectedImageInfo);
    }
  }, [selectedImage, imageLocation]);

  useEffect(() => {
    if (returnedImage) {
      getImageDetails(`${returnedImage} `, setReturnedImageInfo);
    }
  }, [returnedImage, retry]);

  const handleDownload = (imageUrl: string, imageName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-[710px] flex flex-col sm:flex-row gap-4">
        <ImageCard
          title="Original"
          imageSrc={imageLocation}
          imageInfo={selectedImageInfo}
          onClick={() => openModal(imageLocation)}
        />
        {
          isLoading ? (
            <div className="flex flex-col justify-center items-center text-center ml-36">
              <Spinner />
            </div>
          ) : !isLoading && !errorMessage ? (
            <ImageCard
              title="After"
              imageSrc={`${returnedImage}`}
              imageInfo={returnedImageInfo}
              onClick={() => openModal(`${returnedImage} `)}
              onDownload={() =>
                handleDownload(
                  `${returnedImage}`,
                  'processed_image.png',
                )
              }
            />
          ) : (
            <div className="flex flex-col justify-center items-center text-center ml-36">
              <p className="text-red-800 text-center">{errorMessage}</p>
              <Button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded text-center"
                onClick={handleRetry && handleRetry}
              >
                Retry
              </Button>
            </div>
          )}
      </div>

      {isModalOpen && modalImageSrc && (
        <Modal imageSrc={modalImageSrc} onClose={closeModal} />
      )}
    </>
  );
};
