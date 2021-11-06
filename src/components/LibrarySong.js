import React from "react";
//for now Player returns nothing
const LibrarySong = ({ song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs }) => {
    //Handlers
    //handler to select songs
    const songSelectHandler = async() => {
        //select song
        await setCurrentSong(song);
        //add active state
        const newSongs = songs.map((song) => {
            //check if clicked song
            if (song.id === id) {
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

        //check if song is playing
        if(isPlaying){
            audioRef.current.play();
        }
    };
    //on classname of library song we add a condition to check if song is activr
    return (
        <div
            onClick={songSelectHandler}
            className={`library-song ${song.active ? "selected" : ""}`} >
            <img
                alt={song.name}
                src={song.cover}>
            </img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div >
    );
}

export default LibrarySong;