import { Pressable, Text, View } from "react-native";
import { default as SoundTile } from "../components/SoundTile";
import useSounds from "../hooks/useSounds";

import { SAMPLE_DATA } from "../data/sample";
import { AudioPlayer } from "expo-audio";

export default function Index() {
  const {
    urlSoundPlayers,
    playSound,
    loadedCount,
    isLoadedStatuses,
    isPlayingStatuses,
    playedOnceStatuses,
  } = useSounds(SAMPLE_DATA);

  const handlePress = (player: AudioPlayer, index: number) => {
    playSound(player);
  };

  const handlePlayAll = () => {
    urlSoundPlayers.forEach((player) => {
      playSound(player);
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable
        style={{
          backgroundColor: "#3498db",
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 8,
          alignSelf: "center",
          marginTop: 15,
          marginBottom: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 4,
        }}
        onPress={handlePlayAll}
        disabled={loadedCount !== SAMPLE_DATA.length}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Play All Sounds
        </Text>
      </Pressable>
      <View
        style={{
          padding: 15,
          margin: 10,
          backgroundColor: "#f0f0f0",
          borderRadius: 8,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 5,
            color: "#333",
          }}
        >
          Loading Sounds
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: loadedCount === SAMPLE_DATA.length ? "#2ecc71" : "#3498db",
          }}
        >
          {loadedCount} of {SAMPLE_DATA.length} sounds loaded
        </Text>
        <View
          style={{
            height: 10,
            backgroundColor: "#e0e0e0",
            width: "100%",
            borderRadius: 5,
            marginTop: 10,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${(loadedCount / SAMPLE_DATA.length) * 100}%`,
              backgroundColor:
                loadedCount === SAMPLE_DATA.length ? "#2ecc71" : "#3498db",
              borderRadius: 5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: 5,
          overflowY: "scroll",
          flex: 1,
        }}
      >
        {urlSoundPlayers.map((player, index) => (
          <SoundTile
            key={index}
            index={index}
            player={player}
            isLoaded={isLoadedStatuses[index] || false}
            isPlaying={isPlayingStatuses[index] || false}
            playedOnce={playedOnceStatuses[index] || false}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
}
