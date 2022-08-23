// React
import { useContext } from 'react';
import { ThemeContext } from '../../App'

const HeaderSection = () => {
    // Context //
    const { theme } = useContext(ThemeContext)

    return (
        <>
        {theme ? (
                <>
                    <img src='./LogoIcon1.png' />
                </>
            ) : (
                <>
                    <img src='./LogoIcon2.png' />
                </>
            )}
        </>
    )
}

export default HeaderSection
