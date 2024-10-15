// Create this file at: components/shared/ui/spinner.tsx

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};
