import { IconButton } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ShareButton = () => {
  const dispatch = useDispatch();
  const { words, title } = useSelector( ({words,title}) => ({ words, title }) );
  const url = `https://hakt0r.github.io/zbingo?title=${encodeURIComponent(title)}&words=${encodeURIComponent(words)}`;
  return <IconButton color="inherit" onClick={ e => {
    if ( navigator.share ) {
      navigator.share({ title: 'zbingo sheet', url })
      .then( () => console.log('sharing is caring') )
      .catch( console.error );
    } else {
      const input = document.createElement('input');
      document.body.append(input);
      input.value = url;
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand("copy");
      input.remove();
      dispatch({ type:'shareShow' });
    }
  }}><Share/></IconButton>;
}

export default ShareButton;
