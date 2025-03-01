import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">読み込み中...</p>
    </div>
  );
};

export default Loading;