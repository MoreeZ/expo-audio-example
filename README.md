# Expo Audio Demo App

A React Native application built with Expo that demonstrates audio loading and playback functionality with comprehensive status tracking.

## Features

- Loading and playing audio files from remote URLs
- Real-time tracking of multiple status indicators:
  - Loaded status (green/red)
  - Currently playing status (orange/gray)
  - Played at least once status (purple/gray)
- "Play All" button to play all loaded sounds simultaneously
- Visual loading progress indicator
- Componentized UI with reusable elements

## Project Structure

- `app/index.tsx` - Main application screen
- `hooks/useSounds.js` - Custom hook for audio management
- `data/sample.js` - Sample audio URLs
- `components/` - Reusable UI components:
  - `StatusIndicator.tsx` - Individual status display
  - `SoundTile.tsx` - Container for sound buttons with status indicators

## Getting Started

### Prerequisites

- Node.js and npm installed
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Scan the QR code with the Expo Go app on your mobile device or run on a simulator.

## Usage

When you launch the app:

1. Audio files will begin loading automatically
2. The progress bar shows loading status
3. Click individual sound tiles to play them
4. Once all sounds are loaded, you can use the "Play All Sounds" button
5. Watch the status indicators change as sounds load and play

## Technologies Used

- React Native
- Expo
- expo-audio library
- TypeScript
- React Hooks for state management
