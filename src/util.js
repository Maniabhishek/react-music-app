export const playAudio = (isPlaying,audioRef) =>{
    if(isPlaying){
        const playPromise = audioRef.current.play();
        if(playPromise!==undefined){
            playPromise.then((audio)=>{ 
                audioRef.current.play();
            })
        }
    }
}

export const skipHandler = (direction ,songs,currentSong,setCurrentSong,isPlaying , audioRef) => {
    let currentIndex = songs.findIndex((song)=>song.id===currentSong.id)
    let nextIdx;
    // console.log("🎰",songs.length)
    if(direction==="skip-forward"){
        if(currentIndex<(songs.length-1)){
            nextIdx=currentIndex+1;
            // or
            nextIdx = (currentIndex+1) % songs.length;
        }
        else{
            nextIdx=0;
        }
    }
    else{
        if(currentIndex===0){
            nextIdx=songs.length-1;
        }
        else{
            nextIdx=currentIndex-1;
        }
    }
    setCurrentSong(songs[nextIdx]);
    
    playAudio(isPlaying,audioRef)

}