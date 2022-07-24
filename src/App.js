
// React
import React, { useState, useContext, useEffect } from "react";
// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// Context
import playerContext from './Context/playerContext'

// Pages
import Home from './Pages/Home'

function App() {
  // useState //
  const [theme, setTheme] = useState(true)
  const [playState, setPlayState] = useState(true)
  const [songsArr, setSongsArr] = useState([

  ])
  // Functions //
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
      <ThemeContext.Provider value={{ theme, playState, songsArr, setSongsArr , themeFunction, playIconMorph, playIconMorphInput }}>
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