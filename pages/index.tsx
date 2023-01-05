//import video from "../src/assets/video.mp4";
import useVideoPlayer from "../src/hooks/useVideoPlayer";
import { MutableRefObject, useEffect, useRef } from "react";

//import icons
import {
  BsFillVolumeMuteFill,
  BsFillPlayFill,
  BsFillVolumeUpFill,
  BsFillPauseFill,
} from "react-icons/bs";

export default function Home() {
  const videoElement = useRef<HTMLVideoElement>(null);
  const {
    playerState,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    togglePlay,
  } = useVideoPlayer(videoElement);
  console.log("elapsed time", playerState.totalWatchTime);
  return (
    <div className="container">
      <div className="video-wrapper">
        <video ref={videoElement} onTimeUpdate={handleOnTimeUpdate}>
          <source src="/assets/video.mp4" type="video/mp4"></source>
        </video>
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <BsFillPlayFill color="white" />
              ) : (
                <BsFillPauseFill color="white" />
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <BsFillVolumeUpFill color="white" />
            ) : (
              <BsFillVolumeMuteFill color="white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
