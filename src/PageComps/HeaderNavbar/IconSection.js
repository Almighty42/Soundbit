
// React
import { useState, useContext } from 'react';
import { ThemeContext } from '../../App'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
// SVGR Icons
import { CloseIcon1, CloseIcon2, MaxIcon1, MaxIcon2, MinIcon1, MinIcon2, LogoIcon1, LogoIcon2 } from '../../SVGR/SVGRExportComp'
// Electron controls
const { ipcRenderer } = window
// Style
const useStyles = makeStyles({
    navDivSizing1: {
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: 'hsl(0, 0%, 93%)',
            cursor: 'pointer'
        }
    },
    navDivSizing2: {
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: 'hsl(236, 100%, 26%)',
            cursor: 'pointer'
        }
    },
});

const IconSection = () => {

    // *Style* //
    const classes = useStyles();
    // *Context* //
    const { theme, themeFunction } = useContext(ThemeContext)

    return (
        <>
            {theme ? (
                <>
                {/* Light Theme */}
                    {/* Dark mode Icon */}
                    <div onClick={() => { themeFunction(); }} className={classes.navDivSizing1} style={{ WebkitAppRegion: "no-drag" }} >
                        <img src='./DarkModeIcon1.png' />
                    </div>
                    {/* Minimize Icon */}
                    <div onClick={() => { ipcRenderer.send('minimize') }} className={classes.navDivSizing1} style={{ WebkitAppRegion: "no-drag" }}>
                        <MinIcon2 className={classes.navIcon1} />
                    </div>
                    {/* Maximize Icon */}        
                    <div onClick={() => { ipcRenderer.send('maximize') }} className={classes.navDivSizing1} style={{ WebkitAppRegion: "no-drag" }}>
                        <MaxIcon2 className={classes.navIcon1} />
                    </div>
                    {/* Close Icon */}
                    <div onClick={() => { ipcRenderer.send('close') }} className={classes.navDivSizing1} style={{ WebkitAppRegion: "no-drag" }}>
                        <CloseIcon2 className={classes.navIcon1} />
                    </div>
                </>
            ) : (
                <>
                {/* Dark theme */}
                    {/* Dark mode Icon */}
                    <div onClick={() => { themeFunction(); }} className={classes.navDivSizing2} style={{ WebkitAppRegion: "no-drag" }} >
                        <img src='./DarkModeIcon2.png' />
                    </div>
                    {/* Minimize Icon */}
                    <div onClick={() => { ipcRenderer.send('minimize') }} className={classes.navDivSizing2} style={{ WebkitAppRegion: "no-drag" }}>
                        <MinIcon1 className={classes.navIcon1} />
                    </div>
                    {/* Maximize Icon */}  
                    <div onClick={() => { ipcRenderer.send('maximize') }} className={classes.navDivSizing2} style={{ WebkitAppRegion: "no-drag" }}>
                        <MaxIcon1 className={classes.navIcon1} />
                    </div>
                    {/* Close Icon */}
                    <div onClick={() => { ipcRenderer.send('close') }} className={classes.navDivSizing2} style={{ WebkitAppRegion: "no-drag" }}>
                        <CloseIcon1 className={classes.navIcon1} />
                    </div>
                </>
            )}
        </>
    )
}

export default IconSection
