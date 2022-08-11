// React
import React, { useContext, useState } from 'react';
// Material UI
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// Context
import { ThemeContext } from '../App'
// Style
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
}));
// Slider
const PrettoSlider = withStyles({
  root: {
    height: 8,
    paddingTop:'18px'
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider({ value, audio, dur, currentTime, setCurrentTime, fmtMSS }) {
  // *Style* //
  const classes = useStyles();
  // *Context* //
  const { theme } = useContext(ThemeContext)
  // *Functions* //
  // Function that connects Reducer and Slider
  const handleProgress = ( event ,e) => {
    let compute = (e * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute
  }

  return (
    <div className={classes.root}>
      <PrettoSlider onChange={handleProgress} value={dur ? (currentTime * 100) / dur : 0} valueLabelFormat={fmtMSS(currentTime)} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} style={{ color: `${theme ? 'hsl(263, 100%, 50%)' : '#46b9b9'}` }} />
    </div>
  );
}