import Image from '@/components/shared/Image';

export const Modal = ({ imageSrc, onClose }: { imageSrc: string; onClose: () => void }) => (
    <div
        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
        <div className="relative">
            <button className="absolute top-0 right-0 m-4 text-white text-3xl" onClick={onClose}>
                &times;
            </button>
            <Image
                src={imageSrc}
                className="rounded-lg shadow-lg max-h-[80vh] max-w-[90vw]"
                alt="expanded image"
                height={1000}
                width={1000}
            />
        </div>
    </div>
);