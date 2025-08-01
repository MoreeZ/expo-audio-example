import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { AudioPlayer } from "expo-audio";
import { default as StatusIndicator } from "./StatusIndicator";

interface SoundTileProps {
  index: number;
  player: AudioPlayer | null;
  isLoaded: boolean;
  isPlaying: boolean;
  playedOnce: boolean;
  onPress: (player: AudioPlayer, index: number) => void;
}

/**
 * A reusable sound tile component that displays a button with sound index
 * and status indicators
 */
export const SoundTile = ({
  index,
  player,
  isLoaded,
  isPlaying,
  playedOnce,
  onPress,
}: SoundTileProps) => {
  const isDownloading = !player;
  
  return (
    <Pressable 
      style={[styles.container, isDownloading && styles.downloading]} 
      onPress={() => player && onPress(player, index)}
      disabled={!player}
    >
      <Text style={styles.indexText}>{index + 1}</Text>
      <View style={styles.statusContainer}>
        <StatusIndicator
          label="Downloading"
          isActive={isDownloading}
          activeColor="#3498db"
        />
        <StatusIndicator
          label="Loaded"
          isActive={isLoaded}
          activeColor="green"
        />
        <StatusIndicator
          label="Playing"
          isActive={isPlaying}
          activeColor="#ff9500"
        />
        <StatusIndicator
          label="Played Once"
          isActive={playedOnce}
          activeColor="#9c27b0"
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    minHeight: 80,
    margin: 8,
    backgroundColor: "#555",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    paddingVertical: 8,
  },
  downloading: {
    backgroundColor: "#777",
    opacity: 0.7,
  },
  indexText: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusContainer: {
    width: "100%",
    paddingHorizontal: 4,
  },
});

export default SoundTile;
