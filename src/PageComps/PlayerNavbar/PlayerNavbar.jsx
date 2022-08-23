// React
import { useState, useContext, useRef, useEffect } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
// Comps
import Slider from '../../Comps/Slider'
import SoundSlider from '../../Comps/SoundSlider'
// Context
import playerContext from '../../Context/playerContext';
import { ThemeContext } from '../../App'
// Sections
import NavigationSection from './NavigationSection';
// Style
const useStyles = makeStyles({
    navbar: {
        width: '100vw',
        height: '64px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    navbarDivL: {
        height: '64px',
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '17px'
    },
    navbarDivR: {
        height: '64px',
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        paddingRight: '17px'
    },
    navbarDivC: {
        height: '64px',
        width: '100%',
        margin: '0px 35px 0px 35px',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        fontSize: '0.5em',
        color: 'black',
    },
});

const PlayerNavbar = () => {
    // useState //
    const [dur, setDur] = useState(0)
    const [autoplayState, setAutoplayState] = useState(true)
    // Style //
    const classes = useStyles();
    // Context //
    const {
        currentSong,
        songs,
        playing,
        handleEnd,
        SetCurrent,
    } = useContext(playerContext)
    const { audioFlip,
        currentTime,
        setCurrentTime,
        val,
    } = useContext(ThemeContext)
    // useRef //
    const audio = useRef('audio_tag');
    // useEffect //
    useEffect(() => {
        toggleAudio()
        console.log("Audio")
    }, [audioFlip])
    
    useEffect(() => {
        setAutoplayState(!autoplayState)
    }, [playing])

    useEffect(() => {
      audio.current.currentTime = 0
      setCurrentTime(0)
    }, [val])

    // Functions //
    // Function that turns seconds into a 00:00 format
    const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~(s) }
    // Function that plays audio in Reducer
    const toggleAudio = () => { audio.current.paused ? audio.current.play() : audio.current.pause(); }

    const urlFunc = () => {
        if (songs[currentSong] === undefined) {
            let newCurrentSong = currentSong-1
            SetCurrent(newCurrentSong)
            return songs[newCurrentSong].url
        } else {
            return songs[currentSong].url
        }
    }

    return (
        <>
            <div className={classes.navbar}>
                {/* Song Navigation */}
                <div className={classes.navbarDivL} >
                    <NavigationSection toggleAudio={toggleAudio} audio={audio} />
                </div>
                {/* Song slider and audio element */}
                <div className={classes.navbarDivC} >
                    <audio

                        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                        onCanPlay={(e) => setDur(e.target.duration)}
                        onEnded={handleEnd}
                        autoPlay={autoplayState}

                        ref={audio}
                        type="audio/mpeg"
                        src={songs.length === 0 ? '' : urlFunc()}
                        preload='true'
                    />
                    <Slider audio={audio} dur={dur} currentTime={currentTime} setCurrentTime={setCurrentTime} fmtMSS={fmtMSS} />
                </div>
                {/* Sound Slider */}
                <div className={classes.navbarDivR} >
                    <SoundSlider audio={audio} />
                </div>
            </div>
        </>
    )
}

export default PlayerNavbar