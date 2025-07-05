import { useEffect, useState, useCallback } from "react";
import { createAudioPlayer } from "expo-audio";

/**
 * Custom hook to load and manage local, URL, and remote-id audio using expo-audio.
 * Automatically creates and disposes AudioPlayer instances.
 * @param remoteAudioIds - IDs for remote storageObjects (fetched via getFileUrl)
 * @param localAudioPaths - Local asset paths (require or string)
 * @param remoteAudioUrls - Direct URL strings
 */
export default function useSounds(
  remoteAudioUrls = []
) {
  const [urlSoundPlayers, setUrlSoundPlayers] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

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
    const players = [];
    const loadPromises = remoteAudioUrls.map(
      (url) =>
        new Promise((resolve) => {
          const player = createAudioPlayer({ uri: url }, );
          players.push(player);
          const sub = player.addListener(
            Audio.PLAYBACK_STATUS_UPDATE,
            (status) => {
              console.log("LOADING:", status);
              if (status.isLoaded) {
                setLoadedCount((c) => c + 1);
                sub.remove();
                resolve(player);
              }
            }
          );
        })
    );

    Promise.all(loadPromises).then((loadedPlayers) => {
      setUrlSoundPlayers(loadedPlayers);
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
  const playSound = (player, volume = 1, onPlaybackStatusUpdate = null) => {
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
          (status)=>{
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
  };
}
