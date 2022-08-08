// React
import { useState, useContext, useEffect } from 'react';
// Context
import playerContext from '../../../Context/playerContext'
import { ThemeContext } from '../../../App';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// Clsx
import clsx from 'clsx';
import { ViewArrayOutlined } from '@material-ui/icons';
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
        cursor: 'default',
        userSelect: 'none',
    }
});
// Ipc renderer
const { ipcRenderer } = 'electron'
// Hooks
const reqData = () => {
    ipcRenderer.send('asynchronous-message', 'Requesting the data')
}

const FilterSection = () => {
    console.log( ipcRenderer )
    // *Style* //
    const classes = useStyles();
    // *Context* //
    const { theme } = useContext(ThemeContext)
    const { songsSet, togglePlaying, playing, songSet1 } = useContext(playerContext)
    const { setSongsArr,
            songsArr,
            playIconMorphInput
    } = useContext(ThemeContext)
    // *useState* //
    const [stateTitle, setStateTitle] = useState(false)
    const [stateFinalValue, setStateFinalValue] = useState([])
    const [stateAuthor, setStateAuthor] = useState(false)
    const [stateCount, setStateCount] = useState(false)
    const [stateLength, setStateLength] = useState(false)
    // *useEffect* //

    // Listener for backend code
    useEffect(() => {
        ipcRenderer.on('asynchronous-reply', (event, arg) => {
            /* console.log(arg.path) */
            // If the IPC reply is successful
            if (!arg.other[0]) {

                // Sorting for frontend
                let songTitles = arg.other[2]
                let songAuthorSelector = arg.other[3][0].common.artists
                let songCountSelector = arg.other[3][0].common.track.no
                let songLengthSelector = arg.other[3][0].format.duration

                let songAuthors = []
                let songCounts = []
                let songLengths = []
                let finalSongsArr = []
                let newSongs = arg[4]
                let number = 0
                let number2 = 0

                arg.other[3].map((song) => {
                    songAuthors.push(song.common.artists)
                    songCounts.push(song.common.track.no)
                    songLengths.push(song.format.duration)
                    finalSongsArr.push([false, false, song.common.artists, song.common.track.no, song.format.duration])
                })

                arg.other[2].forEach(element => {
                    finalSongsArr[number][0] = element;
                    number++
                });
                
                arg.path.forEach(element => {
                    finalSongsArr[number2][1] = element;
                    number2++
                });
                // Set songs in Reducer and in frontend 
                songsSet(finalSongsArr)
                setSongsArr(finalSongsArr)
                setStateFinalValue(finalSongsArr)
                // Set current song on first in array
                songSet1();

            }

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

    // *Functions* //

    // Function that sorts when filter buttons are pressed
    const sortItems = (title, param) => {
        // Title represents positive/negative order
        if (title) {
            let sorted = [...stateFinalValue].sort((a, b) => { return a[param] > b[param] ? 1 : -1; })

            // Code that fixes a bug with sorting
            if (!isEqual(sorted, stateFinalValue)) {
                updateSongs(sorted)
                songSet1()
            }

        } else if (!title) {
            let sorted = [...stateFinalValue].sort((a, b) => { return a[param] > b[param] ? -1 : 1; })

            // Code that fixes a bug with sorting
            if (!isEqual(sorted, stateFinalValue)) {
                updateSongs(sorted)
                songSet1()
            }

        }

    }
    // Function that updates Reducer and frontend
    const updateSongs = (sorted) => {
        // For re-ordering songs
        setStateFinalValue(sorted)
        // For in-app array of songs
        setSongsArr(sorted)
        // For Reducer
        songsSet(sorted)
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

    return (
        <>
            {/* Title */}
            <div onClick={() => { setStateUpdate('title') ; sortItems(stateTitle, 0); }} className={clsx(classes.titleTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >Title</h2>
                {stateTitle ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* Artist */}
            <div onClick={() => { setStateUpdate('artist'); sortItems(stateAuthor, 2); }} className={clsx(classes.authorTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >Author</h2>
                {stateAuthor ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* # */}
            <div onClick={() => { setStateUpdate('count'); sortItems(stateCount, 3); }} className={clsx(classes.countTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >#</h2>
                {stateCount ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* Length */}
            <div onClick={() => { setStateUpdate('length'); sortItems(stateLength, 4); }} className={clsx(classes.lengthTopBar, classes.tabTopBar)} >
                <h2 className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} >Length</h2>
                {stateLength ? <ExpandLessIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} /> : <ExpandMoreIcon className={classes.tabTopBarH2} style={{ color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />}
            </div>
            {/* Add songs and Remove songs */}
            <div className={clsx(classes.lengthTopBar, classes.tabTopBar)} >
                <AddCircleOutlineIcon onClick={() => { reqData(); }} style={{ cursor: 'pointer', color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}` }} />
                <img onClick={() => { updateSongs([]) }} src={theme ? './CloseIcon1.png' : './CloseIcon2.png'} style={{ cursor: 'pointer', color: `${theme ? 'hsl(261, 20%, 10%)' : 'hsl(261, 50%, 90%)'}`, paddingLeft:'16px' }} />
            </div>


        </>
    )
}

export default FilterSection
