import { Button } from '@/components/shared/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shared/ui/card';
import Image from '@/components/shared/Image';

export const ImageCard = ({
  title,
  imageSrc,
  imageInfo,
  onClick,
  onDownload,
}: {
  title: string;
  imageSrc: string;
  imageInfo?: { width: number; height: number; size: string } | null;
  onClick: () => void;
  onDownload?: () => void;
}) => (
  <div className="w-full sm:w-1/2">
    <Card className="h-full flex flex-col justify-between border shadow-white">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-display font-normal">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center grow">
        <div className="grow flex items-center justify-center">
          <Image
            src={imageSrc}
            className="w-full h-auto object-contain max-h-[350px] rounded-md shadow-lg cursor-pointer"
            alt={`${title} image`}
            height={350}
            width={350}
            onClick={onClick}
          />
        </div>
        {imageInfo && (
          <div className="py-4 text-gray-400 text-sm">
            <p>
              Dimensions: {imageInfo.width} x {imageInfo.height} pixels
            </p>
            <p>Size: {imageInfo.size}</p>
          </div>
        )}
        {onDownload && (
          <Button
            className="w-full font-semibold p-2 text-secondary rounded-md transition duration-300 ease-in-out"
            onClick={onDownload}
          >
            Download
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);
