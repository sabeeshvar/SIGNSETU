# SignSetu Machine Learning & Gesture Model

## 1. Feature Representation

MediaPipe vision extracts 21 3D hand keypoints $(x_i, y_i, z_i)$ for $i \in \{0, \dots, 20\}$:
- **0**: Wrist
- **1–4**: Thumb (CMC, MCP, IP, TIP)
- **5–8**: Index Finger (MCP, PIP, DIP, TIP)
- **9–12**: Middle Finger (MCP, PIP, DIP, TIP)
- **13–16**: Ring Finger (MCP, PIP, DIP, TIP)
- **17–20**: Pinky Finger (MCP, PIP, DIP, TIP)

### Normalization Process
1. **Translation Invariance**: The wrist joint $(x_0, y_0, z_0)$ is translated to the origin $(0, 0, 0)$:
   $$x'_i = x_i - x_0, \quad y'_i = y_i - y_0, \quad z'_i = z_i - z_0$$

2. **Scale Invariance**: Normalization factor $s$ is computed as the Euclidean distance between the wrist $(x_0, y_0)$ and the middle knuckle $(x_9, y_9)$:
   $$s = \sqrt{(x_9 - x_0)^2 + (y_9 - y_0)^2}$$
   $$x''_i = \frac{x'_i}{s}, \quad y''_i = \frac{y'_i}{s}, \quad z''_i = \frac{z'_i}{s}$$

3. **Feature Vector Extraction**: Flattened into a 63-dimensional normalized feature vector:
   $$V = [x''_0, y''_0, z''_0, \dots, x''_{20}, y''_{20}, z''_{20}] \in \mathbb{R}^{63}$$

---

## 2. Deterministic Classifier Rules

The current client engine implements the **Prototype Gesture Classifier** via deterministic morphology:
- **Finger Extension Ratio**: Evaluates fingertip-to-wrist vs. knuckle-to-wrist ratios.
- **Joint Curl Angles**: Dot product vector angles at PIP and DIP joints.
- **Orientation Vector**: Directed vector from wrist (0) to middle MCP (9).
- **Digit Convergence**: Tip-to-tip distances for pinch and contact gestures.

---

## 3. Temporal Smoothing Buffer

Raw per-frame predictions often exhibit single-frame tracking noise. SignSetu uses a sliding window buffer:
- **Default Window Size**: 8 frames
- **Minimum Stable Count**: 4 or 5 frames
- **Transition Rule**: A sign transition is committed only when the mode frequency in the window meets the stability count.

---

## 4. Confidence Tiering

| Confidence Band | Tier | Application Behavior |
| :--- | :--- | :--- |
| **85% – 100%** | **High Confidence** | Stable prediction; triggers speech output & logs to history. |
| **60% – 84%** | **Confirming** | Displays candidate sign with "Hold steady" prompt. |
| **Below 60%** | **Unknown** | Low confidence; filtered out to prevent false triggers. |
