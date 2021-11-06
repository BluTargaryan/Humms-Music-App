import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

//for now Player returns time control and play control
const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo,songs,setCurrentSong,setSongs }) => {



//array code at end specifies that useeffect should run when target updates

    //Event handlers
    //so that library list updates on skip with param repping next or previous value
const activeLibraryHandler = (nextPrev)=>{
        //add active state
        const newSongs = songs.map((song) => {
            //check if clicked song
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true
                }
            }
            else {
                return {
                    ...song,
                    active: false
                }
            }
        });
        setSongs(newSongs);
}
    //to make input draggable
    const dragHandler = (e) => {
        //to drag song progress and update audio
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }
    //skip button handler
    const skipTrackHandler = async (direction) => {
        //find index of current song
        let currentIndex =songs.findIndex((song)=> song.id===currentSong.id);
        if(direction==='skip-forward'){
            //way to reset skip when it reaches end of list
           await setCurrentSong(songs[(currentIndex+1)% songs.length]);
           activeLibraryHandler(songs[(currentIndex+1)% songs.length]);
        }
        if(direction==='skip-back'){
            //way to reset skip when it reaches beginning of list
            if((currentIndex-1)%songs.length===-1){
             await setCurrentSong(songs[songs.length-1]);
             activeLibraryHandler(songs[songs.length-1]);
             //playaudio no work if condition met so
             if(isPlaying){
                audioRef.current.play();
            }
             return;
            }
            await setCurrentSong(songs[(currentIndex-1)% songs.length]);
            activeLibraryHandler(songs[(currentIndex-1)% songs.length]);
        }
        if(isPlaying){
            audioRef.current.play();
        }
    }

    //func to get and format time(in minutes and seconds)
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    //handler for playing or pausing song
    const playSongHandler = () => {
        //condition for if song is playing or not
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    //State

    //Add the styles
     const trackAnim ={
         transform:`translateX(${songInfo.animationPercentage}%)`
     };


    //add style for gradient color in track class
    //at p for end time there is condition for if time not exist yet
    return (
        <div className="player-container">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                <input
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type="range" />
                    <div style={trackAnim } className="animate-track"></div>
                    </div>
                    
                <p>{songInfo.duration? getTime(songInfo.duration): "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>


        </div>
    );
}

export default Player;