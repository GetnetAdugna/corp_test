import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ImageData = {
  selectedImage: string;
  returnedImage: string;
  error: string;
  id: number;
};

export type UploadState = {
  imagesList: ImageData[];
};

export type UploadActions = {
  addImageToList: (newImage: ImageData) => void;
  removeImageFromList: (id: number) => void;
};

export type UploadStore = UploadState & UploadActions;

export const defaultInitState: UploadState = {
  imagesList: [],
};

// useCounterStore
export const useUploadStore = create(
  persist<UploadStore>(
    (set) => ({
      ...defaultInitState,
      addImageToList: (newImageData) =>
        set((state) => ({ imagesList: [newImageData, ...state.imagesList] })),
      removeImageFromList: (id) =>
        set((state) => ({
          imagesList: state.imagesList.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'upload-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
