// Imports
import BasePage from "../PageComps/BasePage"
import HeaderNavbar from "../PageComps/HeaderNavbar/HeaderNavbar.jsx"
import PlayerNavbar from "../PageComps/PlayerNavbar/PlayerNavbar.jsx"
import NavBar from '../PageComps/FileBrowser/Navbar/NavBar.jsx'
// Context
import PlayerState from "../Context/PlayerState"

const Home = () => {

    return (
        <>
            <PlayerState>
                <BasePage>
                    <HeaderNavbar />
                    <PlayerNavbar />
                    <div style={{ width: '100vw', height: '100%', display: 'flex', justifyContent: 'space-between' }} >
                        <NavBar />
                    </div>
                </BasePage>
            </PlayerState>
        </>
    )
}

export default Home
