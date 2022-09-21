import React, { useReducer } from 'react';
import playerContext from './playerContext';
import playerReducer from './playerReducer';
import { songsArr } from './songs';

import {
  SET_CURRENT_SONG,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  SET_SONGS_ARRAY
} from './types'

const PlayerState = props => {
  const initialState = {
    currentSong: 0,
    songs: songsArr,
    repeat: false,
    random: false,
    playing: false,
    audio: null
  }
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Set playing state
  const togglePlaying = () => {dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true })}
  // Set playing state FALSE
  const togglePlayingFalse = () => dispatch({ type: TOGGLE_PLAYING, data: false })
  // Set playing state TRUE
  const togglePlayingTrue = () => dispatch({ type: TOGGLE_PLAYING, data: { state: { playing : true } } })
  // Set current song
  const SetCurrent = id => dispatch({ type: SET_CURRENT_SONG, data: id })

  // Prev song
  const prevSong = () => {
    if (state.currentSong === 0) {
      SetCurrent(state.songs.length - 1)
    } else {
      SetCurrent(state.currentSong - 1)
    }
  }
  
  // Next song
  const nextSong = () => {
    if (state.currentSong === state.songs.length - 1) {
      SetCurrent(0)
    } else {
      SetCurrent(state.currentSong + 1)

    }
  }
  
  // Set songs array
  const songsSet = (songArr) => {dispatch({ type: SET_SONGS_ARRAY, data: songArr });}
  
  // Repeat and Random
  const toggleRepeat = (id) => dispatch({ type: TOGGLE_REPEAT, data: state.repeat ? false : true })
  const toggleRandom = (id) => dispatch({ type: TOGGLE_RANDOM, data: state.random ? false : true })

  // End of Song
  const handleEnd = (func) => {
    // Check for random and repeat options
    if (state.random) {
      return dispatch({ type: SET_CURRENT_SONG, data: ~~(Math.random() * state.songs.length) })
    } else {
      if (state.repeat) {
        nextSong()
      } else if ((state.currentSong === state.songs.length - 1)) {
        func()
        return
      } else {
        nextSong();
      }
    }
  }

  return <playerContext.Provider
    value={{
      currentSong: state.currentSong,
      songs: state.songs,
      repeat: state.repeat,
      random: state.random,
      playing: state.playing,
      audio: state.audio,
      nextSong,
      prevSong,
      SetCurrent,
      toggleRandom,
      toggleRepeat,
      togglePlaying,
      togglePlayingFalse,
      togglePlayingTrue,
      handleEnd,
      songsSet
    }}>

    {props.children}

  </playerContext.Provider>
}

export default PlayerState;