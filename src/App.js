import React, { useState, useRef } from "react";
//Import styles
import './styles/App.scss';
//Adding components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//import util
import data from './data';

function App() {
  //ref html tag
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  //state for song info
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage:0
  })
  //to get current playing song
  const [currentSong, setCurrentSong] = useState(songs[0]);
  //to check if song is playing
  const [isPlaying, setIsPlaying] = useState(false);
  //to check if library window is open
  const [libraryStatus, setLibraryStatus] = useState(false);


  //Handler for time tracking of the song
  const timeUpdateHandler = (e) => {
    //get current and duration time from target i.e.  song
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calc percentage for song
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation=Math.round((roundedCurrent/roundedDuration)*100);
    
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage:animation
    });
  }

  //what to do when song ends
  const songEndHandler=async()=>{
    let currentIndex =songs.findIndex((song)=> song.id===currentSong.id);
     //way to reset skip when it reaches end of list
     await setCurrentSong(songs[(currentIndex+1)% songs.length]);
     if(isPlaying){
      audioRef.current.play();
  }
  }


  return (
    <div className={`App ${libraryStatus ?'library-active':''}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo} 
        songs={songs}
        setSongs={setSongs}
        />

      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}>
      </audio>
    </div>
  );
}

export default App;
