import React, { useRef,useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause , faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons'
// import { playAudio ,skipHandler} from "../util";

const Player = ({setSongs,songs,audioRef,setSongInfo,songInfo,currentSong,isPlaying,setCurrentSong,setIsPlaying}) => {

   
    const [playImage,setPlayImage] =useState(faPlay);
    const trackStyle = {transform:`translateX(${songInfo.completePer}%)`}
    const playSongHandler = ()=>{

        if(isPlaying){
            // setIsPlaying(false) 
            // or
            setIsPlaying(!isPlaying)
            audioRef.current.pause();
            setPlayImage(faPlay);
            
            
        }
        else{
            // setIsPlaying(true)
            // or
            setIsPlaying(!isPlaying)
            audioRef.current.play();
            setPlayImage(faPause)
        }
      
    }

    useEffect(()=>{
        const updateSong = songs.map((song)=>{
            if(song.id===currentSong.id)
            {
                return {
                    ...song,
                    active:true
                }
            }
            else{
                return {
                    ...song,
                    active:false
                }
            }
            
        })

        setSongs(updateSong);
        console.log("select song")
    },[currentSong])

    

    const formatTime = (time) =>{
        return (
            Math.floor(time/60) +":" + ("0"+Math.floor(time%60)).slice(-2)
        )
    }

    const activeLibraryHandler = (currentSongObj) => {

        console.log("inside activeLibrary handler",currentSongObj.id)
        console.log("===",songs[1].id)
        // if(songs[5].id === currentSongObj.id){
        //     console.log("active library box",currentSongObj.active)
        // }
        const newSong = songs.map((song)=>{
            if(song.id===currentSongObj.id){
                return {
                    ...songs,
                    active:true,
                    
                };
            }
            else
            {
                return {
                    ...songs,
                    active:false,
                    
                };
            }
        })

        setSongs(newSong);

        // console.log(newSong);

        // setSongs(newSong);
    }
   

    const dragHandler = (e) =>{
        // console.log(e.target.value)
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

    const skipHandler = async (direction) => {
        let currentIndex = songs.findIndex((song)=>song.id===currentSong.id)
        let nextIdx=0;
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
       
    //    console.log(songs[nextIdx])

       await setCurrentSong(songs[nextIdx]);
    // await activeLibraryHandler(songs[nextIdx])
       if(isPlaying) audioRef.current.play();
        
        
    
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <div className="track" style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input onChange={dragHandler} 
                        min={0} 
                        max={songInfo.duration||0} 
                        value={songInfo.currentTime} 
                        type="range" />
                    <div style={trackStyle} className="animate-track"></div>
                </div>
                <p>{songInfo.duration? formatTime(songInfo.duration):"0:00"}</p>
            </div>
            <div className="player-control">
                <FontAwesomeIcon onClick={()=>skipHandler("")} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={playImage} />
                <FontAwesomeIcon onClick={()=>skipHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight} />

            </div>
            
        </div>
    )
}

export default Player ;