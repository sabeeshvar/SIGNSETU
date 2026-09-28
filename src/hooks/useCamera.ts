import { useState, useEffect, useRef, useCallback } from 'react';
import { CameraManager } from '../vision/CameraManager';
import type { CameraState, CameraDeviceInfo } from '../types/system';

export function useCamera(selectedDeviceId?: string) {
  const [cameraState, setCameraState] = useState<CameraState>('INITIALIZING');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devices, setDevices] = useState<CameraDeviceInfo[]>([]);
  const cameraManagerRef = useRef<CameraManager | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!cameraManagerRef.current) {
    cameraManagerRef.current = new CameraManager();
  }

  // Load available video input devices
  const refreshDevices = useCallback(async () => {
    if (cameraManagerRef.current) {
      const devList = await cameraManagerRef.current.getAvailableDevices();
      setDevices(devList);
    }
  }, []);

  const startCamera = useCallback(async (deviceId?: string) => {
    setCameraState('INITIALIZING');
    setErrorMessage(null);

    try {
      const stream = await cameraManagerRef.current!.startCamera(deviceId || selectedDeviceId);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {
          // auto-play restrictions or aborted
        });
      }
      setCameraState('RUNNING');
      await refreshDevices();
    } catch (err: unknown) {
      const error = err as Error;
      setCameraState('ERROR');

      if (error.message === 'CAMERA_PERMISSION_DENIED') {
        setErrorMessage('Camera access was denied. Please allow camera permissions in your browser to enable sign recognition.');
      } else if (error.message === 'CAMERA_NOT_FOUND') {
        setErrorMessage('No camera device detected on this system. You can also use Demo Mode.');
      } else if (error.message === 'CAMERA_IN_USE') {
        setErrorMessage('Camera is currently in use by another application.');
      } else {
        setErrorMessage(error.message || 'Unable to start camera.');
      }
    }
  }, [selectedDeviceId, refreshDevices]);

  const stopCamera = useCallback(() => {
    if (cameraManagerRef.current) {
      cameraManagerRef.current.stopCamera();
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState('STOPPED');
  }, []);

  const restartCamera = useCallback(async (deviceId?: string) => {
    stopCamera();
    await startCamera(deviceId);
  }, [startCamera, stopCamera]);

  useEffect(() => {
    // Initial mount: auto-start camera
    startCamera(selectedDeviceId);

    return () => {
      if (cameraManagerRef.current) {
        cameraManagerRef.current.stopCamera();
      }
    };
  }, [selectedDeviceId, startCamera]);

  return {
    videoRef,
    cameraState,
    errorMessage,
    devices,
    startCamera,
    stopCamera,
    restartCamera,
    refreshDevices,
  };
}
