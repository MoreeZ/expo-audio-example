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
  const [isLoadedStatuses, setIsLoadedStatuses] = useState([]);
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
    // Initialize the status array with the correct length
    setIsLoadedStatuses(Array(remoteAudioUrls.length).fill(false));

    const players = [];
    const loadPromises = remoteAudioUrls.map(
      (url, index) =>
        new Promise((resolve) => {
          const player = createAudioPlayer({ uri: url });
          players.push(player);

          // Add listener to update loading status
          let sub = player.addListener(PLAYBACK_STATUS_UPDATE, (status) => {
            console.log("STATUS_UPDATE:", status);
            if (status.isLoaded) {
              resolve(player);
              sub.remove();
            }
          });
        })
    );

    Promise.all(loadPromises).then((loadedPlayers) => {
      setUrlSoundPlayers(loadedPlayers);
      loadedPlayers.forEach((player, index) => {
        // Permantent listener
        player.addListener(PLAYBACK_STATUS_UPDATE, (status) => {
          setIsLoadedStatuses((prev) => {
            const newStatuses = [...prev];
            newStatuses[index] = status.isLoaded;
            return newStatuses;
          });
        });
      });
    });

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
  const playSound = (
    player,
    volume = 1,
    onPlaybackStatusUpdate = undefined
  ) => {
    console.log("playSound");
    try {
      if (volume !== undefined) {
        player.volume = volume;
      }

      let unsubscribe;
      console.log("BEFORE onPlaybackStatusUpdate");
      if (onPlaybackStatusUpdate) {
        const sub = player.addListener(
          Audio.PLAYBACK_STATUS_UPDATE,
          (status) => {
            console.log("PLAYING:", status);
            onPlaybackStatusUpdate(status);
          }
        );
        unsubscribe = () => sub.remove();
      }
      player && player.seekTo(0);
      console.log("BEFORE PLAY", player);
      player && player.play();

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
  };
}
