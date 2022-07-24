
// React
import { useState, useContext } from 'react'
import { ThemeContext } from '../../App'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// SVGR Icons
import { PrevIcon, PauseIcon, NextIcon } from '../../SVGR/SVGRExportComp'
// Style
const useStyles = makeStyles({
    navbar: {
        width: '100vw',
        height: '64px',
        background: 'linear-gradient(261deg, hsl(180, 100%, 94%) 0%, rgba(255,225,247,1) 50%, rgba(226,255,255,1) 100%)',
        display: 'flex',
        alignContent: 'center',
        justifyContent:'space-between'
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
        paddingRight:'17px'
    },
    navbarDivC: {
        height: '64px',
        width: '100%',
        margin:'0px 35px 0px 35px',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        fontSize: '0.5em',
        color: 'black',
    },
});
// Context
import playerContext from '../../Context/playerContext';

const NavigationSection = ({ toggleAudio }) => {

    // *Style* //
    const classes = useStyles();
    // *Context* //
    const {
        nextSong,
        prevSong,
        togglePlaying,
        songs

    } = useContext(playerContext)

    const { 
        playIconMorph, 
        playIconMorphInput 
        
    } = useContext(ThemeContext)

    return (
        <>
            {/* Previous song */}
            <IconButton onClick={() => { if (songs.length !== 0) { playIconMorphInput(false);prevSong(); } }}>
                <PrevIcon className={classes.icon} />
            </IconButton>
            {/* Play/Pause song */}
            <IconButton onClick={() => { if (songs.length !== 0) { playIconMorph(); togglePlaying(); toggleAudio() } }}>
                <PauseIcon />
            </IconButton>
            {/* Next song */}
            <IconButton onClick={() => { if (songs.length !== 0) { playIconMorphInput(false);nextSong() } }}>
                <NextIcon className={classes.icon} />
            </IconButton>
        </>
    )
}

export default NavigationSection
