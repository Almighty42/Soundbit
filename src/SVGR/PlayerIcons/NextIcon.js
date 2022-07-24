import * as React from "react"

import { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from "../../App";


const useStyles = makeStyles({
  svg: {
    width: '20px',
    height: '20px',
  },
});

function NextIcon(props) {

  const classes = useStyles();

  const { theme } = useContext(ThemeContext)

  return (
    <svg
      className={classes.svg}
      width='188'
      height='216'
      viewBox="0 0 188 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter:`${theme ? 'drop-shadow( 0 2px 0 hsl(263, 100%, 30%))' : 'drop-shadow( 0 2px 0 hsl(179, 100%, 30%))'}` }}
    >
      <path fill="hsla(170, 50%, 45%, 0)" d="M0 0h188v216H0z" />
      <path
        d="M157.039 91.184L31.008 18.344C17.675 10.636 1 20.258 1 35.658v145.682c0 15.4 16.675 25.022 30.008 17.316l126.031-72.841c13.323-7.7 13.323-26.932 0-34.632z"
        fill={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
        stroke={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
      />
      <path
        d="M187 201V15c0-7.732-6.268-14-14-14s-14 6.268-14 14v186c0 7.732 6.268 14 14 14s14-6.268 14-14z"
        fill={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
        stroke={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
      />
    </svg>
  )
}

export default NextIcon
