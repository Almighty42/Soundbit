// React
import React, { useState, useRef } from "react";
// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Pages
import Home from './Pages/Home'

function App() {
  // useState //
  const [theme, setTheme] = useState(true)
  const [playState, setPlayState] = useState(true)
  const [songsArr, setSongsArr] = useState([])
  const [audioFlip, setAudioFlip] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [finalSongsArr, setFinalSongsArr] = useState([])
  const [stateFinalValue, setStateFinalValue] = useState([])
  const [flip2, setFlip2] = useState(false)
  const [argValue, setArgValue] = useState(false)
  const [flip3, setFlip3] = useState(false)
  const i = useRef(0)
  const [val, setVal] = useState(false)
  
  // Functions //
  const flipAudioFunc = () => {
    setAudioFlip(!audioFlip)
  }

  const themeFunction = () => {
    setTheme(!theme)
  }

  const playIconMorph = () => {
    setPlayState(!playState)
  }

  const playIconMorphInput = (value) => {
    value ? setPlayState(true)  : setPlayState(false)
  }
  
  return (
    <>
      <ThemeContext.Provider value={{ theme, 
        playState, 
        songsArr, 
        setSongsArr , 
        themeFunction, 
        playIconMorph, 
        playIconMorphInput, 
        flipAudioFunc, 
        audioFlip, 
        finalSongsArr,
        stateFinalValue,
        setStateFinalValue,
        setFinalSongsArr,
        flip2,
        setFlip2,
        argValue,
        setArgValue,
        flip3,
        setFlip3,
        i,
        currentTime,
        setCurrentTime,
        val,
        setVal,
         }}>
        <Router>
          <Switch>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
export const ThemeContext = React.createContext();