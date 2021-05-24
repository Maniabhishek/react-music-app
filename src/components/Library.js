import React from 'react'
import LibrarySong from "./LibrarySongs";

const Library =({libraryStatus,audioRef, setSongs,isPlaying, setIsPlaying,songs ,setCurrentSong}) => {
    return (
        <div className={`library ${libraryStatus?"libraryOn":""}`} >
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song=>(<LibrarySong setSongs={setSongs} song={song} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} key={song.id} songs={songs} setCurrentSong={setCurrentSong} />))}
            </div>
        </div>
    )
}

export default Library
