import React, { useState ,useRef} from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss"
// import data
import data from "./data";
// import library
import Library from "./components/Library";
import Nav from "./components/Nav";
import {playAudio, skipHandler} from "./util"

function App() {

  // ref
  const audioRef = useRef(null);

  const [songs , setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[1]);
  const [isPlaying,setIsPlaying] = useState(false);
 
  const [songInfo,setSongInfo] = useState({
    currentTime:0,
    duration:0,
    completePer:0,
})

  const [libraryStatus,setLibraryStatus] = useState(false);

    const timeUpdateHandler = (e) =>{
    const current =e.target.currentTime;
    const duration = e.target.duration;
    const completePercent = Math.floor((Math.floor(current)/Math.floor(duration))*100)
    // console.log(completePercent)
    setSongInfo({...songInfo,currentTime:current,duration:duration,completePer:completePercent})
    

}

  const songEndHandler =async () =>{
    let currentIndex = songs.findIndex((song)=>song.id===currentSong.id)
    let nextIdx;
    // console.log("🎰",songs.length)
    
      if(currentIndex<(songs.length-1)){
          nextIdx=currentIndex+1;
          // or
          nextIdx = (currentIndex+1) % songs.length;
        }
      else{
          nextIdx=0;
      }
      await setCurrentSong(songs[nextIdx]);
      if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus?"library-active":""}`}>
      <Nav libraryStatus={libraryStatus}  setLibraryStatus={setLibraryStatus}/>
      
      <Song currentSong={currentSong}/>
       
      <Player 
              isPlaying={isPlaying}
              setIsPlaying ={setIsPlaying}
              currentSong={currentSong}
              audioRef={audioRef}  
              songInfo={songInfo}
              songs={songs}
              setCurrentSong={setCurrentSong}
              setSongInfo={setSongInfo}
              setSongs={setSongs}
              
      />
      <Library libraryStatus={libraryStatus} setSongs={setSongs} songs={songs} audioRef={audioRef}  setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>

  );
}

export default App;
