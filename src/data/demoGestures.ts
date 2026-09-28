import type { LandmarkPoint } from '../types/recognition';

// Base hand generator that adjusts finger extension according to anatomical joint angles
function createHandSkeleton(fingerExtensions: {
  thumb: number; // 0 = folded, 1 = extended
  index: number;
  middle: number;
  ring: number;
  pinky: number;
}, orientation: 'up' | 'down' | 'horizontal' = 'up'): LandmarkPoint[] {
  // Base wrist position centered in normalized coordinates [0, 1]
  const wrist: LandmarkPoint = { x: 0.5, y: orientation === 'down' ? 0.35 : (orientation === 'horizontal' ? 0.55 : 0.75), z: 0 };
  const landmarks: LandmarkPoint[] = [wrist];

  const dirY = orientation === 'down' ? 1 : (orientation === 'horizontal' ? 0 : -1);
  const dirX = orientation === 'horizontal' ? 1 : 0;

  // Thumb (indices 1..4)
  const thumbExt = fingerExtensions.thumb;
  landmarks.push({ x: wrist.x - 0.05, y: wrist.y + (dirY * 0.06), z: -0.01 }); // 1: CMC
  landmarks.push({ x: wrist.x - 0.09, y: wrist.y + (dirY * 0.12), z: -0.02 }); // 2: MCP
  landmarks.push({ x: wrist.x - 0.13 * (thumbExt ? 1 : 0.5), y: wrist.y + (dirY * (thumbExt ? 0.18 : 0.14)), z: -0.02 }); // 3: IP
  landmarks.push({ x: wrist.x - 0.17 * (thumbExt ? 1 : 0.3), y: wrist.y + (dirY * (thumbExt ? 0.24 : 0.12)), z: -0.02 }); // 4: TIP

  // Helper for fingers: MCP, PIP, DIP, TIP
  const fingerBases = [
    { mcpX: -0.06, mcpY: 0.22, name: 'index', ext: fingerExtensions.index },
    { mcpX: -0.01, mcpY: 0.24, name: 'middle', ext: fingerExtensions.middle },
    { mcpX: 0.04, mcpY: 0.22, name: 'ring', ext: fingerExtensions.ring },
    { mcpX: 0.09, mcpY: 0.19, name: 'pinky', ext: fingerExtensions.pinky },
  ];

  fingerBases.forEach(finger => {
    const ext = finger.ext; // 1 = straight up, 0 = folded down to palm
    // MCP
    const mcp: LandmarkPoint = {
      x: wrist.x + finger.mcpX + (dirX * finger.mcpY * 0.5),
      y: wrist.y + (dirY * finger.mcpY),
      z: 0
    };
    landmarks.push(mcp);

    // PIP
    const pipLen = 0.08;
    const pip: LandmarkPoint = {
      x: mcp.x + (dirX * pipLen),
      y: mcp.y + (dirY * pipLen * (ext > 0.5 ? 1 : 0.2)),
      z: ext > 0.5 ? 0 : -0.03
    };
    landmarks.push(pip);

    // DIP
    const dipLen = 0.06;
    const dip: LandmarkPoint = {
      x: pip.x + (dirX * dipLen),
      y: pip.y + (dirY * dipLen * (ext > 0.5 ? 1 : -0.5)),
      z: ext > 0.5 ? 0 : -0.05
    };
    landmarks.push(dip);

    // TIP
    const tipLen = 0.06;
    const tip: LandmarkPoint = {
      x: dip.x + (dirX * tipLen),
      y: dip.y + (dirY * tipLen * (ext > 0.5 ? 1 : -0.8)),
      z: ext > 0.5 ? 0 : -0.04
    };
    landmarks.push(tip);
  });

  return landmarks;
}

export const DEMO_LANDMARK_PRESETS: Record<string, LandmarkPoint[]> = {
  hello: createHandSkeleton({ thumb: 1, index: 1, middle: 1, ring: 1, pinky: 1 }, 'up'),
  thank_you: createHandSkeleton({ thumb: 1, index: 1, middle: 1, ring: 1, pinky: 1 }, 'horizontal'),
  yes: createHandSkeleton({ thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0 }, 'up'), // Fist
  no: createHandSkeleton({ thumb: 1, index: 1, middle: 1, ring: 0, pinky: 0 }, 'horizontal'),
  help: createHandSkeleton({ thumb: 1, index: 0, middle: 0, ring: 0, pinky: 0 }, 'up'), // Thumbs up
  stop: createHandSkeleton({ thumb: 1, index: 1, middle: 1, ring: 1, pinky: 1 }, 'up'),
  please: createHandSkeleton({ thumb: 1, index: 1, middle: 1, ring: 1, pinky: 1 }, 'horizontal'),
  good: createHandSkeleton({ thumb: 1, index: 0, middle: 0, ring: 0, pinky: 0 }, 'up'),
  bad: createHandSkeleton({ thumb: 1, index: 0, middle: 0, ring: 0, pinky: 0 }, 'down'),
  water: createHandSkeleton({ thumb: 0, index: 1, middle: 1, ring: 1, pinky: 0 }, 'up'), // W sign
  food: createHandSkeleton({ thumb: 0.3, index: 0.3, middle: 0.3, ring: 0.3, pinky: 0.3 }, 'up'), // Pinch
  home: createHandSkeleton({ thumb: 0, index: 1, middle: 1, ring: 0, pinky: 0 }, 'up'), // V sign
  school: createHandSkeleton({ thumb: 1, index: 1, middle: 1, ring: 1, pinky: 1 }, 'horizontal'),
  hospital: createHandSkeleton({ thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0 }, 'up'), // Point up
};
