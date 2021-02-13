
import { IconButton } from '@material-ui/core';
import { Edit, Shuffle } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bingo from './Bingo';
import ShareButton from './ShareButton';
import Show  from './Show';
import Words from './Words';
import Confetti from 'react-dom-confetti';

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

function App() {
  const dispatch = useDispatch();
  const youWin = useSelector( ({youWin}) => youWin );
  return <div className={ youWin ? 'win' : null }>
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
  </Show>
  <Confetti active={ youWin } config={ config }/>
  </div>; }

export default App;
