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

function PrevIcon(props) {

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
        d="M30.96 124.816l126.032 72.841c13.333 7.706 30.008-1.916 30.008-17.316V34.659c0-15.4-16.675-25.022-30.008-17.316L30.961 90.184c-13.323 7.7-13.323 26.932 0 34.632z"
        fill={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
        stroke={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
      />
      <path
        d="M1 15v186c0 7.732 6.268 14 14 14s14-6.268 14-14V15c0-7.732-6.268-14-14-14S1 7.268 1 15z"
        fill={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
        stroke={theme ? 'hsl(263, 100%, 50%)' : 'hsl(179, 99%, 84%)'}
      />
    </svg>
  )
}

export default PrevIcon
//hsl(263, 100%, 50%)
//hsl(179, 99%, 84%)
//drop-shadow( 0 2px 0 hsl(263, 100%, 30%))