// Material UI
import { makeStyles } from '@material-ui/core/styles';
// Sections
import IconSection from './IconSection';
import HeaderSection from './HeaderSection';
// Electron controls
const { ipcRenderer } = window.require("electron");
// Style
const useStyles = makeStyles({
    title: {
        float: 'right',
        fontSize: '1.2em',
    },
    icon1: {
        marginRight: '12px',
        fontSize: '1.2em'
    },
    icon2: {
        fontSize: '1.2em',
    },
    appBar: {
        width: '100vw',
        height: '35px',
        display: 'flex',
        alignItems: 'center'
    },
    appBarDiv1: {
        width: '100%',
        margin: '0px',
        display:'flex',
        justifyContent:'space-between'
    },
    appBarDiv2: {
        paddingLeft: '24px',
        width:'fitContent',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
    },
    appBarDiv3: {
        width:'300px',
        height:'32px',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    navDivSizing1: {
        width:'32px',
        height:'32px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        '&:hover': {
            backgroundColor: 'hsl(0, 0%, 93%)',
            cursor: 'pointer'
        }
    },
    navDivSizing2: {
        width:'32px',
        height:'32px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        '&:hover': {
            backgroundColor: 'hsl(0, 0%, 94%)',
            cursor: 'pointer'
        }
    },

});

const HeaderNavbar = () => {
    // Style //
    const classes = useStyles();

    return (
        <>
             <div className={classes.appBar} >
                <div className={classes.appBarDiv1} style={{ WebkitAppRegion: "drag" }} >
                    {/* Logo */}
                    <div className={classes.appBarDiv2}>
                        <HeaderSection />
                    </div>
                    {/* Tab manipulation */}
                    <div className={classes.appBarDiv3}>
                        <IconSection />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderNavbar