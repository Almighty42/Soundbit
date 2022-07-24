// React
import { useContext } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
// Clsx
import clsx from 'clsx';
// Styles
const useStyles = makeStyles({
    main: {
        width: '100%',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
    },
    songSubdivision: {
        padding: '0px 0px 0px 8px'
    },
    songTitleH1: {
        fontFamily: "'Space Mono', sans-serif",
        fontSize: '14px',
        minWidth: '230px',
    },
    songTitleSubDiv: {
        width: '30%',
        height: '100%',
        padding: '0px 0px 0px 8px'
    },
    songAuthorSubDiv: {
        width: '20%',
        height: '100%',
        padding: '0px 0px 0px 8px'
    },
    songCountSubDiv: {
        width: '100px',
        height: '100%'
    },
    songLengthSubDiv: {
        width: '100px',
        height: '100%'
    },
    textOverflowClass: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        userSelect: 'none',
    },
    songDetailsH1: {
        fontFamily: "'Space Mono', sans-serif",
        fontSize: '14px',
    }
});
// Context
import { ThemeContext } from '../App'
import playerContext from '../Context/playerContext';

const SongTabMain = () => {
    // *Style* //
    const classes = useStyles();
    // *Context* //
    const { theme, songsArr, playIconMorphInput } = useContext(ThemeContext)

    const {
        songs,
        SetCurrent,
        currentSong
    } = useContext(playerContext)

    // *Functions* //
    // Function that turns seconds into a 00:00 format
    const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~(s) }

    return (
        <>
            {songsArr.map((song, i) => (
                <div className={classes.main} >
                    {/* Song title */}
                    <div className={clsx(classes.songSubdivision, classes.songTitleSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songTitleH1)} style={{ color:`${theme ?  'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} > {song[0]} </h1>
                    </div>
                    {/* Song artist */}
                    <div className={clsx(classes.songSubdivision, classes.songAuthorSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songDetailsH1)} style={{ color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} >{song[2]} </h1>
                    </div>
                    {/* Song # */}
                    <div className={clsx(classes.songSubdivision, classes.songCountSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songDetailsH1)} style={{ color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} >{song[3]} </h1>
                    </div>
                    {/* Song length */}
                    <div className={clsx(classes.songSubdivision, classes.songLengthSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songDetailsH1)} style={{ color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} > {fmtMSS(song[4])} </h1>
                    </div>
                    {/* Play song */}
                    <div className={clsx(classes.songSubdivision, classes.songLengthSubDiv)} >
                        <div style={{ fontSize: '16px', width:'100%', height:'100%', marginTop:'7px', color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} >
                            <PlayCircleOutlineIcon style={{ cursor:'pointer' }} key={i} onClick={() => { SetCurrent(i)  }} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SongTabMain
