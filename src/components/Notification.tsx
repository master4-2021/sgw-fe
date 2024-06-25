import React, { useEffect } from 'react';

interface Props {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<Props> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Define background color based on type
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  // Define text color based on type
  const textColor = type === 'success' ? 'text-white' : 'text-white';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} ${textColor} py-2 px-4 rounded shadow-lg`}>
      {message}
    </div>
  );
};

export default Notification;
