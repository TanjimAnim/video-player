import { useState, useEffect, ChangeEvent } from "react";

//import types
import { UsePlayerStateType } from "../types";

const useVideoPlayer = (videoElement: any) => {
  const [playerState, setPlayerState] = useState<UsePlayerStateType>({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    videoLength: 0,
    totalPlayButtonClick: 0,
    totalWatchTime: 0,
  });
  // function for togggle video play/pause
  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      totalPlayButtonClick: (playerState.totalPlayButtonClick += 1),
      isPlaying: !playerState.isPlaying,
    });
  };
  //pause play video depending on isPlaying
  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  useEffect(() => {
    playerState.videoLength = videoElement.current.duration;
  }, [videoElement]);
  //to apply mute unmute
  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);
  useEffect(() => {
    let startTime = new Date();
    if (playerState.isPlaying) {
      console.log("video playing");
    } else {
      playerState.totalWatchTime = new Date().getTime() - startTime.getTime();
      console.log(playerState.totalWatchTime);
    }
  });
  const handleOnTimeUpdate = () => {
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };
  // function to show video progress
  const handleVideoProgress = (event: any) => {
    const manualChange: number = Number(event.target.value);
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };
  //function to control the speed of the video
  const handleVideoSpeed = (event: any) => {
    const speed: number = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };
  //function to toggle mute/unmute
  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  };
};

export default useVideoPlayer;
