import type { CameraDeviceInfo } from '../types/system';

export class CameraManager {
  private currentStream: MediaStream | null = null;

  /**
   * Requests camera stream with responsive constraints
   */
  public async startCamera(deviceId?: string): Promise<MediaStream> {
    this.stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('CAMERA_UNSUPPORTED: Browser does not support mediaDevices API');
    }

    const constraints: MediaStreamConstraints = {
      audio: false,
      video: deviceId
        ? { deviceId: { exact: deviceId } }
        : {
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 30, max: 30 },
          },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.currentStream = stream;
      return stream;
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        throw new Error('CAMERA_PERMISSION_DENIED');
      }
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        throw new Error('CAMERA_NOT_FOUND');
      }
      if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        throw new Error('CAMERA_IN_USE');
      }
      throw error;
    }
  }

  /**
   * Stops all active tracks on the camera stream
   */
  public stopCamera(): void {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch {
          // ignore track cleanup error
        }
      });
      this.currentStream = null;
    }
  }

  /**
   * Retrieves list of video input devices
   */
  public async getAvailableDevices(): Promise<CameraDeviceInfo[]> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return [];
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices
        .filter(d => d.kind === 'videoinput')
        .map((d, index) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${index + 1}`,
        }));
    } catch {
      return [];
    }
  }

  public getStream(): MediaStream | null {
    return this.currentStream;
  }
}
