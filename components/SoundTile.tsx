import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { AudioPlayer } from "expo-audio";
import { default as StatusIndicator } from "./StatusIndicator";

interface SoundTileProps {
  index: number;
  player: AudioPlayer;
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
  return (
    <Pressable style={styles.container} onPress={() => onPress(player, index)}>
      <Text style={styles.indexText}>{index + 1}</Text>
      <View style={styles.statusContainer}>
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
    minHeight: 80, // Use minHeight instead of fixed height
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
    paddingVertical: 8, // Add padding to ensure content fits
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
