// React
import { useContext } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// Clsx
import clsx from 'clsx';
// Context
import { ThemeContext } from '../App'
import playerContext from '../Context/playerContext';

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
    },
    
});

const SongTabMain = () => {
    // Style //
    const classes = useStyles();
    // Context //
    const { theme, 
        songsArr,
        setSongsArr, 
        playIconMorphInput, 
        flipAudioFunc,
        setStateFinalValue,
        setFinalSongsArr,
        setFlip3,
        i,
        setVal,
        val
     } = useContext(ThemeContext)

    const {
        songsSet,
        SetCurrent,
        currentSong,
        playing,
        togglePlaying,
    } = useContext(playerContext)

    // Functions //
    // Function that turns seconds into a 00:00 format
    const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~(s) }
    // Delete individual song
    const delSong = (index) => {
        let newArray = []
        newArray = songsArr.filter((b) => b.number !== index)
        i.current = 0
        newArray.map((song) => {
            song.number = i.current
            i.current = i.current + 1
        })

        setFlip3(true)
        setSongsArr(newArray)
        songsSet(newArray)
        setStateFinalValue(newArray)
        setFinalSongsArr(newArray)
        
        if(newArray.length === 0) {
            playIconMorphInput(true)
        }

    }

    return (
        <>
            {songsArr.map((song, e) => (
                <div className={classes.main} >
                    {/* Song title */}
                    <div className={clsx(classes.songSubdivision, classes.songTitleSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songTitleH1)} style={{ color:`${theme ?  'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} > {song.name} </h1>
                    </div>
                    {/* Song artist */}
                    <div className={clsx(classes.songSubdivision, classes.songAuthorSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songDetailsH1)} style={{ color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} >{song.artist} </h1>
                    </div>
                    {/* Song # */}
                    <div className={clsx(classes.songSubdivision, classes.songCountSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songDetailsH1)} style={{ color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} >{song.track} </h1>
                    </div>
                    {/* Song length */}
                    <div className={clsx(classes.songSubdivision, classes.songLengthSubDiv)} >
                        <h1 className={clsx(classes.textOverflowClass, classes.songDetailsH1)} style={{ color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} > {fmtMSS(song.duration)} </h1>
                    </div>
                    {/* Play song */}
                    <div className={clsx(classes.songSubdivision, classes.songLengthSubDiv)} >
                        <div style={{ fontSize: '16px', width:'100%', height:'100%', marginTop:'7px', color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} >
                            {song.number == currentSong ? (playing ? (
                                <>
                                <PauseCircleOutlineIcon style={{ cursor:'pointer', color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} onClick={() => { togglePlaying(); flipAudioFunc() }} />
                                </>
                            ) : (
                                <>
                                <PlayCircleOutlineIcon style={{ cursor:'pointer', color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} key={e} onClick={() => { togglePlaying();flipAudioFunc()  }} />
                                </>
                            )) : (
                                <>
                                <PlayCircleOutlineIcon style={{ cursor:'pointer' }} key={e} onClick={() => { SetCurrent(e);setVal(!val)/* ;togglePlaying();flipAudioFunc();  */ }} />
                                </>
                            )}
                            <HighlightOffIcon style={{ marginLeft:'16px', cursor:'pointer', color:`${theme ?  'hsl(261, 0%, 50%)' : 'hsl(261, 0%, 60%)'}` }} onClick={() => { delSong(song.number);setVal(!val) }} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SongTabMain
