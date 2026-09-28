import type { LandmarkPoint } from '../types/recognition';

// Canonical 21 hand landmark connections
export const HAND_CONNECTIONS: [number, number][] = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle
  [9, 10], [10, 11], [11, 12],
  // Ring
  [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Knuckle bridges (Palm)
  [5, 9], [9, 13], [13, 17]
];

export interface RenderOptions {
  primaryColor?: string;
  jointColor?: string;
  tipColor?: string;
  lineWidth?: number;
  jointRadius?: number;
  tipRadius?: number;
  mirror?: boolean;
}

export function drawLandmarks(
  ctx: CanvasRenderingContext2D,
  landmarks: LandmarkPoint[],
  width: number,
  height: number,
  options: RenderOptions = {}
): void {
  if (!landmarks || landmarks.length < 21) return;

  const {
    primaryColor = '#0284c7', // Brand Ocean Blue
    jointColor = '#38bdf8',
    tipColor = '#10b981', // Accent Emerald Green
    lineWidth = 3,
    jointRadius = 4,
    tipRadius = 6,
    mirror = true,
  } = options;

  // Coordinate helper: handle mirroring if camera is mirrored
  const getX = (val: number) => (mirror ? (1 - val) * width : val * width);
  const getY = (val: number) => val * height;

  // Draw bone connection lines
  ctx.save();
  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  HAND_CONNECTIONS.forEach(([startIndex, endIndex]) => {
    const p1 = landmarks[startIndex];
    const p2 = landmarks[endIndex];
    if (p1 && p2) {
      ctx.beginPath();
      ctx.moveTo(getX(p1.x), getY(p1.y));
      ctx.lineTo(getX(p2.x), getY(p2.y));
      ctx.stroke();
    }
  });

  // Fingertip landmark indices: 4 (thumb), 8 (index), 12 (middle), 16 (ring), 20 (pinky)
  const tipIndices = new Set([4, 8, 12, 16, 20]);

  // Draw landmark joint nodes
  landmarks.forEach((p, index) => {
    const px = getX(p.x);
    const py = getY(p.y);
    const isTip = tipIndices.has(index);

    ctx.beginPath();
    ctx.arc(px, py, isTip ? tipRadius : jointRadius, 0, 2 * Math.PI);

    if (isTip) {
      ctx.fillStyle = tipColor;
      ctx.shadowColor = tipColor;
      ctx.shadowBlur = 8;
    } else {
      ctx.fillStyle = jointColor;
      ctx.shadowBlur = 0;
    }

    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  ctx.restore();
}
