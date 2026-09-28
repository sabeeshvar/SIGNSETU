export type GestureCategory = 
  | 'communication' 
  | 'emergency' 
  | 'necessity' 
  | 'social' 
  | 'location';

export type FingerState = 'extended' | 'folded' | 'curled' | 'any';

export interface GestureRule {
  thumb: FingerState;
  index: FingerState;
  middle: FingerState;
  ring: FingerState;
  pinky: FingerState;
  palmFacing?: 'camera' | 'away' | 'side' | 'any';
  handOrientation?: 'upright' | 'horizontal' | 'downward' | 'any';
  specialCondition?: 'two_hands' | 'index_thumb_touch' | 'closed_fist' | 'open_palm' | 'index_point';
}

export interface GestureItem {
  id: string;
  english: string;
  tamil: string;
  category: GestureCategory;
  description: string;
  hint: string;
  rule: GestureRule;
}
