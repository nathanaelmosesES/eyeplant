import React, { useRef, useEffect, useState } from 'react';
import { X, Camera as CameraIcon, RefreshCw } from 'lucide-react';

interface CameraViewProps {
  onCapture: (imageBase64: string) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera. Please check permissions.");
        onClose();
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode, onClose]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white' }}>
          <X size={32} />
        </button>
        <button onClick={switchCamera} style={{ background: 'transparent', border: 'none', color: 'white' }}>
          <RefreshCw size={24} />
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          style={{ width: '100%', height: 'auto', maxHeight: '100%' }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button 
          onClick={takePhoto}
          disabled={!isReady}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '5px solid #ccc',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isReady ? 1 : 0.5
          }}
        >
          <CameraIcon size={32} color="black" />
        </button>
      </div>
    </div>
  );
};

export default CameraView;
