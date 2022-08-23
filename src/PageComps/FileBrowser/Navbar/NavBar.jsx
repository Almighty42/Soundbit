// Material UI
import { makeStyles } from '@material-ui/core/styles';
// Sections
import FilterSection from './FilterSection';
// Comps
import SongTabMain from '../../../Comps/SongTabMain';
// Style
const useStyles = makeStyles({
    main: {
        width: '100%',
        margin: '0px 20px',
    },
    topBar: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    titleTopBar: {
        width: '175px',
    },
    authorTopBar: {
        width: '150px',
    },
    countTopBar: {
        width: '100px',
    },
    lengthTopBar: {
        width: '75px',
    },
    tabTopBar: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 0px 0px 8px',
        '&:hover': {
            backgroundColor: 'hsl(316, 100%, 94%)'
        }
    },
    tabTopBarH2: {
        fontFamily: "'Roboto Condensed', sans-serif",
        fontSize: '14px',
        cursor: 'default',
        userSelect: 'none'
    },
    bodyBar1: {
        width: '100%',
        height: '70%',
        overflow: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '5px',
        },
        '&::-webkit-scrollbar-track': {
            visibility:'hidden'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius:'5px'
        }
    }
});

const NavBar = () => {
    // Style //
    const classes = useStyles();

    return (
        <div className={classes.main} >
            {/* Filter section */}
            <div className={classes.topBar} >
                <FilterSection />
            </div>
            {/* Body of songs */}
            <div className={classes.bodyBar1} >
                <SongTabMain />
            </div>
        </div>
    )
}

export default NavBar