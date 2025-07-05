import { useEffect, useState, useCallback } from "react";
import { createAudioPlayer, PLAYBACK_STATUS_UPDATE } from "expo-audio";

/**
 * Custom hook to load and manage local, URL, and remote-id audio using expo-audio.
 * Automatically creates and disposes AudioPlayer instances.
 * @param remoteAudioIds - IDs for remote storageObjects (fetched via getFileUrl)
 * @param localAudioPaths - Local asset paths (require or string)
 * @param remoteAudioUrls - Direct URL strings
 */
export default function useSounds(remoteAudioUrls = []) {
  const [urlSoundPlayers, setUrlSoundPlayers] = useState([]);
  const [isLoadedStatuses, setIsLoadedStatuses] = useState(
    Array(remoteAudioUrls.length).fill(false)
  );
  const [isPlayingStatuses, setIsPlayingStatuses] = useState(
    Array(remoteAudioUrls.length).fill(false)
  );
  const [playedOnceStatuses, setPlayedOnceStatuses] = useState(
    Array(remoteAudioUrls.length).fill(false)
  );
  const loadedCount = isLoadedStatuses.filter(Boolean).length;

  // Cleanup helper
  const cleanup = useCallback((soundPlayers) => {
    soundPlayers.forEach((player) => {
      try {
        player.remove();
        player.release();
      } catch {}
    });
  }, []);

  // Load remote urls
  useEffect(() => {
    const players = remoteAudioUrls.map((url, index) => {
      const player = createAudioPlayer({ uri: url });
      player.addListener(PLAYBACK_STATUS_UPDATE, (status) => {
        console.log("STATUS_UPDATE:", status);

        // Update loaded status
        setIsLoadedStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[index] = status.isLoaded;
          return newStatuses;
        });

        // Update playing status
        setIsPlayingStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[index] = status.playing;
          return newStatuses;
        });

        // If it's playing, also mark it as played at least once
        if (status.playing) {
          setPlayedOnceStatuses((prev) => {
            const newStatuses = [...prev];
            newStatuses[index] = true;
            return newStatuses;
          });
        }
      });
      return player;
    });
    setUrlSoundPlayers(players);

    return () => cleanup(players);
  }, [remoteAudioUrls.join(",")]);

  /**
   * Play a single AudioPlayer from start, with optional volume and status callback.
   *
   * @param player                  – an AudioPlayer instance
   * @param volume                  – (0–1) playback volume
   * @param onPlaybackStatusUpdate  – called on every status update
   * @returns a function to call when you want to remove the listener
   */
  const playSound = (player) => {
    console.log("playSound", player);
    try {
      let unsubscribe;
      console.log("BEFORE onPlaybackStatusUpdate");
      player && player.isLoaded && player.seekTo(0);
      console.log("BEFORE PLAY", player);
      player && player.isLoaded && player.play();
      return unsubscribe;
    } catch (err) {
      console.error("playSound error", err);
    }
  };

  return {
    urlSoundPlayers,
    playSound,
    loadedCount,
    isLoadedStatuses,
    isPlayingStatuses,
    playedOnceStatuses,
  };
}
