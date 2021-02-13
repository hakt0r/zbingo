

import { createStore } from "redux";

// set defaults

const defaults = JSON.stringify({
  title: "All Hands 1",
  showEditor:false,
  wordsInEditor: "",
  titleInEditor: "",
  words: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25",
  bingo: false,
  youwin: false,
  showMenu: false
});

// read storage

const values = JSON.parse( localStorage.getItem('zbingo_state') || defaults );

// read query params

const urlParams = new URLSearchParams(window.location.search);
const newWords = urlParams.get('words');
const newTitle = urlParams.get('title');

if ( newWords && newTitle ){
  values.words = newWords;
  values.title = newTitle;
  localStorage.setItem('zbingo_state',JSON.stringify(values));
}

// shuffle function

const bingoShuffle = (words) => { // split words, trim, remove empty, and shuffle
  const all = words.split('\n').map(w => w.trim()).filter(w => w != '').sort( () => Math.random() - 0.5 ).map( name => ({
    name,
    value: false
  }));
  const rows = [];
  for ( let i = 0; i < 5; i++ ) rows.push( all.splice(0,5) );
  return rows;
};

// winning rules

const bingoCheck = ( bingo ) => {
  const checkRow = (row) => row.reduce( (p,cell) => p && cell.value, true );
  const checkColumn = (x)=> bingo.reduce( (p,row) => p && row[x].value, true );
  let win = false;
  return (
    bingo.reduce( (p,row) => p || checkRow(row), false ) ||
    [0,1,2,3,4].reduce( (p,x)=> p || checkColumn(x), false ) ||
    ( bingo[0][0].value && bingo[1][1].value && bingo[2][2].value && bingo[3][3].value && bingo[4][4].value ) ||
    ( bingo[4][0].value && bingo[3][1].value && bingo[2][2].value && bingo[1][3].value && bingo[0][4].value )
  );
}

// reducer

const store = createStore( ( state=values, action ) => {
  switch ( action.type ) {
    case "toggleMenu":   return { ...state, showMenu: ! state.showMenu };
    case "editorChange": return { ...state, wordsInEditor: action.value.trim() };
    case "editorTitle":  return { ...state, titleInEditor: action.value };
    case "editorToggle": return { ...state, showEditor: !state.showEditor, wordsInEditor: state.words, titleInEditor: state.title, };
    case "bingoShuffle": return { ...state, youWin:false, bingo: bingoShuffle(state.words) }
    case "editorSave":   return { ...state, words:state.wordsInEditor, title:state.titleInEditor, showEditor:false, bingo:bingoShuffle(state.wordsInEditor), youWin:false };
    case "bingoClick":
      const bingo = [...state.bingo];
      bingo[action.y] = [...bingo[action.y]];
      bingo[action.y][action.x].value = ! bingo[action.y][action.x].value;
      const youWin = bingoCheck(bingo);
      return { ...state, bingo, youWin };
    default: return state;
  }
}
// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe( ()=> {
  localStorage.setItem('zbingo_state',JSON.stringify(store.getState()));
});

export default store;