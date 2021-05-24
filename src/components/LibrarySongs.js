import React from 'react'
// import { playAudio } from '../util';

const LibraySong = ({song,setSongs,setCurrentSong,songs,audioRef,isPlaying}) => {

    

    const songSelectHandler = async () =>{
        await setCurrentSong(song);
        const newSongs = songs.map((sng)=>{
           if(sng.id===song.id){
               return {...sng,
                        active:true
                        }
           }
           else{
            return {...sng,
                active:false
                }
           }
        })
        setSongs(newSongs)

        if(isPlaying) audioRef.current.play();
        

    //    playAudio(isPlaying,audioRef);
    }

    return (
        <div onClick={songSelectHandler} className={`song-containers ${song.active? "selected": ""}`}>
            <img alt={song.name} src={song.cover}/>
            <div className="songDescription">
                <h2>{song.name}</h2>
                <h3>{song.artist}</h3>
            </div>
        </div>
    )
}

export default LibraySong;
