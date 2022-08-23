// Context
import { ThemeContext } from '../App'
import { useContext } from 'react';

const BasePage = (props) => {

    // Context //
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <div style={{ height:'100%', overflow:'hidden', borderRadius:'20px', background:`${theme ? 'linear-gradient(282deg, hsl(180, 100%, 94%) 0%, hsl(316, 100%, 94%) 50%, hsl(180, 100%, 94%) 100%)' : 'linear-gradient(282deg, rgba(0,8,117,1) 0%, rgba(76,0,148,1) 50%, rgba(0,8,117,1) 100%)'}` }} >
                {props.children}
            </div>
        </>
    )
}

export default BasePage
