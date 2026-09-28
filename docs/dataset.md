# SignSetu Dataset Structure & Contribution Guide

## 1. Directory Structure

```
dataset/
├── README.md
├── hello/
├── thank_you/
├── yes/
├── no/
├── help/
├── stop/
├── please/
├── good/
├── bad/
├── water/
├── food/
├── home/
├── school/
└── hospital/
```

---

## 2. Sample Data Format

Future training samples should be contributed in either:
1. **JSON Landmark Sequence Format** (`.json`):
   ```json
   {
     "gesture_id": "hello",
     "timestamp": 1727544000000,
     "fps": 30,
     "frames": [
       [
         {"x": 0.51, "y": 0.72, "z": -0.01},
         ... 21 landmark points
       ]
     ]
   }
   ```
2. **CSV Normalized Feature Vector** (`.csv`):
   63 coordinate columns ($x_0, y_0, z_0 \dots x_{20}, y_{20}, z_{20}$) followed by label ID.

---

## 3. Ethical and Copyright Compliance

- To respect community sovereignty and open data ethics, SignSetu does not scrape or bundle third-party proprietary video corpora without explicit open licenses.
- Contributors can record their own signed gestures locally using the SignSetu Landmark recorder and submit verified data for community model training.
