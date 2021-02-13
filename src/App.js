
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Edit, ExitToApp, Shuffle } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bingo from './Bingo';
import ShareButton from './ShareButton';
import Show  from './Show';
import Words from './Words';

function App() {
  const dispatch = useDispatch();
  const { title, youwin } = useSelector( ({ title, youwin }) => ({ title, youwin }) );
  return <div className={ youwin ? 'win' : null }>
  <div className="menuButton">
    <IconButton color="inherit" onClick={ e => dispatch({type:'editorToggle'})}>
      <Edit/>
    </IconButton>
    <IconButton color="inherit" onClick={ e => dispatch({type:'bingoShuffle'})}>
      <Shuffle/>
    </IconButton>
    <ShareButton/>
  </div>
  <Show stateKey="showMenu">
  </Show>
  <Show stateKey="showEditor">
    <Words/>
  </Show>
  <Show stateKey="bingo">
    <Bingo/>
  </Show></div>; }

export default App;
