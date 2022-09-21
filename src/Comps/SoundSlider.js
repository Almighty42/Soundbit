// React
import React, { useContext, useState, useRef } from 'react';
// Material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
// Context
import { ThemeContext } from '../App'
// Icons
import { AudioIcon } from '../SVGR/SVGRExportComp';
// Slider
const SoundVolumeSlider = withStyles({
  root: {
    height: 8,
    paddingTop: '13px',
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -3,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% - 6px)',
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

export default function SoundSlider({ audio }) {
  // useState //
  const [statevolum, setStateVolum] = useState(100)
  // Context //
  const { theme } = useContext(ThemeContext)
  // Functions //
  // Function that handles volume between Reducer and Slider
  const handleVolume = (event, q) => {
    setStateVolum(q);
    audio.current.volume = q * 0.01;
  }
  // Function that handles onWheel event
  const handleOnWheel = (deltaY) => {
    if (deltaY > 0) {
      setStateVolum(statevolum-5)
      audio.current.volume = statevolum * 0.01;
    } else if (deltaY < 0) {
      setStateVolum(statevolum+5)
      audio.current.volume = statevolum * 0.01;
    }
  }

  return (
    <>
      <div style={{ paddingRight:'10px', marginTop:'5px' }}>
        <AudioIcon />
      </div>
      <SoundVolumeSlider value={statevolum} onChange={handleVolume} onWheel={(e) => { handleOnWheel(e.deltaY) }} defaultValue={20} valueLabelDisplay="auto" aria-label="pretto slider" style={{ color: `${theme ? 'hsl(263, 100%, 50%)' : 'hsl(180, 50%, 50%)'}`, }} />
    </>
  );
}