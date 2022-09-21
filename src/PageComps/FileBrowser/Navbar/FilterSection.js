// React
import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
// Context
import playerContext from '../../../Context/playerContext'
import { ThemeContext } from '../../../App';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// Clsx
import clsx from 'clsx';
// Lodash Function
import { isEqual } from 'lodash'
// Style
const useStyles = makeStyles({
    topBar: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    titleTopBar: {
        width: '30%',
    },
    authorTopBar: {
        width: '20%',
    },
    countTopBar: {
        width: '100px',
    },
    lengthTopBar: {
        width: '100px',
    },
    tabTopBar: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 0px 0px 8px',
    },
    tabTopBarH2: {
        fontFamily: "'Space Mono', sans-serif",
        fontSize: '14px',
        cursor: 'pointer',
        userSelect: 'none',
    }
});
// Ipc renderer
const ipcRenderer = window.ipcRenderer
// Hooks
const reqDataFolder = () => {
    window.electronAPI.reqFolder()
}
const reqDataFile = () => {
    window.electronAPI.reqFile()
}

const FilterSection = () => {
    // Style //
    const classes = useStyles();
    // Context //
    const { songsSet,
        togglePlaying,
        playing,
        toggleRepeat,
        repeat,
    } = useContext(playerContext)
    const { setSongsArr,
        playIconMorphInput,
        finalSongsArr,
        stateFinalValue,
        setStateFinalValue,
        setFinalSongsArr,
        flip2,
        setFlip2,
        setArgValue,
        i,
        theme
    } = useContext(ThemeContext)
    // useState //
    const [stateTitle, setStateTitle] = useState(false)
    const [stateAuthor, setStateAuthor] = useState(false)
    const [stateCount, setStateCount] = useState(false)
    const [stateLength, setStateLength] = useState(false)
    const [flip, setFlipped] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [dialog, setDialog] = useState('')

    // useEffect //
    // Listener for backend code

    useEffect(() => {
        window.electronAPI.asyncReply1((event, arg) => {
            // If the IPC reply is successful
            if (!arg.other[0]) {

                let newSongs = []
                let number = 0
                let number2 = 0

                setArgValue(arg)

                setFlip2(true)

                arg.other[3].map((song) => {
                    newSongs.push({ name: "", hasName: false, url: "", hasUrl: false, artist: song.common.artists, track: song.common.track.no, duration: song.format.duration, number: i.current })
                    i.current = i.current + 1
                })

                arg.other[2].map(element => {
                    if (!newSongs[number].hasName) {
                        newSongs[number].hasName = true
                        newSongs[number].name = element
                    } else {
                    }
                    number++
                });

                arg.path.map(element => {
                    if (!newSongs[number2].hasUrl) {
                        newSongs[number2].hasUrl = true
                        newSongs[number2].url = element
                    } else {
                    }
                    number2++
                });

                newSongs.map((song) => {
                    setFinalSongsArr(finalSongsArr => [...finalSongsArr, song])
                })
                setFlip2(false)       

                newSongs = []
            }
        })
        window.electronAPI.asyncReply2((event, arg) => {
            // If the IPC reply is successful
            if (!arg.other[0]) {
                setFlip2(true)
                let newSongs2 = ({})
                newSongs2 = ({ name: arg.other[2], hasName: true, url: arg.path, hasUrl: true, artist: arg.other[3].common.artists, track: arg.other[3].common.track.no, duration: arg.other[3].format.duration, number: i.current })
                setFinalSongsArr(finalSongsArr => [...finalSongsArr, newSongs2])
                setFlip2(false)
                i.current = i.current + 1
            }
        })
        window.electronAPI.invalidValue((event, arg) => {
            setOpen2(true)
            setDialog(arg+' : is not a valid file')
        })
    }, [])

    // Listener that updates play icon
    useEffect(() => {
        if (playing) {
            playIconMorphInput(false)
        } else if (!playing) {
            playIconMorphInput(true)
        }
    }, [playing])

    useEffect(() => {
        if (flip2) {
            songsSet(finalSongsArr)
            setSongsArr(finalSongsArr)
            setStateFinalValue(finalSongsArr)
        }
    }, [finalSongsArr])

    // Functions //

    // Function that sorts when filter buttons are pressed
    const sortItems = (title, param) => {
        // Title represents positive/negative order
        if (title) {
            let sorted = [...stateFinalValue].sort((a, b) => { return a[param] > b[param] ? 1 : -1; })
            // Code that fixes a bug with sorting
            if (!isEqual(sorted, stateFinalValue)) {
                updateSongs(sorted)
            }

        } else if (!title) {
            let sorted = [...stateFinalValue].sort((a, b) => { return a[param] > b[param] ? -1 : 1; })

            // Code that fixes a bug with sorting
            if (!isEqual(sorted, stateFinalValue)) {
                updateSongs(sorted)
            }

        }

    }
    // Function that updates Reducer and frontend
    const updateSongs = (sorted) => {
        if (sorted.length === 0) {
            setFlipped(!flip)
            i.current = 0
            playIconMorphInput(true)

            if (playing) {
                togglePlaying()
            }
            setStateFinalValue([])
            setSongsArr([])
            songsSet([])
            setFinalSongsArr([])
        } else {
            let newArray = []
            newArray = sorted
            i.current = 0
            newArray.map((song) => {
                song.number = i.current
                i.current = i.current + 1
            })
            setStateFinalValue(newArray)
            setSongsArr(newArray)
            songsSet(newArray)
            setFinalSongsArr(newArray)
        }
    }
    // Function that updates filter icon state
    const setStateUpdate = (option) => {
        switch (option) {
            case 'title':
                setStateTitle(!stateTitle);
                setStateAuthor(false)
                setStateCount(false)
                setStateLength(false)
                break;
            case 'artist':
                setStateTitle(false);
                setStateAuthor(!stateAuthor)
                setStateCount(false)
                setStateLength(false)
                break;
            case 'count':
                setStateTitle(false);
                setStateAuthor(false)
                setStateCount(!stateCount)
                setStateLength(false)
                break;
            case 'length':
                setStateTitle(false);
                setStateAuthor(false)
                setStateCount(false)
                setStateLength(!stateLength)
                break;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    return (
        <>
            {/* Title */}
            <div onClick={() => { setStateUpdate('title'); sortItems(stateTitle, "name") }} className={clsx(classes.titleTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >Title</h2>
                {stateTitle ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* Artist */}
            <div onClick={() => { setStateUpdate('artist'); sortItems(stateAuthor, "artist"); }} className={clsx(classes.authorTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >Author</h2>
                {stateAuthor ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* # */}
            <div onClick={() => { setStateUpdate('count'); sortItems(stateCount, "track"); }} className={clsx(classes.countTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >#</h2>
                {stateCount ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* Length */}
            <div onClick={() => { setStateUpdate('length'); sortItems(stateLength, "duration"); }} className={clsx(classes.lengthTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >Length</h2>
                {stateLength ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* Add songs and Remove songs */}
            <div className={clsx(classes.lengthTopBar, classes.tabTopBar)} >
                <Dialog open={open} onClose={handleClose}>
                    <DialogActions>
                        <Button onClick={() => { handleClose(); reqDataFile() }}>File</Button>
                        <Button onClick={() => { handleClose(); reqDataFolder() }}>Folder</Button>
                    </DialogActions>
                </Dialog>
                <AddCircleOutlineIcon onClick={() => { /* reqData(); */ handleClickOpen() }} style={{ cursor: 'pointer', color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />
                <img onClick={() => { updateSongs([]) }} src={theme ? './CloseIcon1.png' : './CloseIcon2.png'} style={{ cursor: 'pointer', color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}`, paddingLeft: '16px' }} />
                <img onClick={() => { toggleRepeat(); }} src={theme ? repeat ? './RepeatIcon1.png' : './RepeatIcon2.png' : repeat ? './RepeatIcon3.png' : './RepeatIcon4.png'} style={{ cursor: 'pointer', paddingLeft: '16px' }} />
            </div>
            <Dialog open={open2} onClose={handleClose}>
                    <DialogActions style={{ padding:'0px' }}>
                        <Alert onClose={() => {setOpen2(false)}} severity="error">{dialog}</Alert>
                    </DialogActions>
            </Dialog>
        </>
    )
}

export default FilterSection