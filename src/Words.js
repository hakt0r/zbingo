import { Paper } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Cancel, Save } from '@material-ui/icons'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Words = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect( () => {
    if ( ! ref.current ) return;
    var observer = new MutationObserver( function( mutations ){
      mutations.forEach( function( mutation ){
        if ( mutation.attributeName === 'style' && window.getComputedStyle( ref.current ).getPropertyValue( 'height' ) !== '100%' ){
          ref.current.style.height = "100%";
          ref.current.style.overflow = 'unset';
        }
      });
    });
    observer.observe( ref.current, { attributes: true } );
  }, [ref] );
  const { wordsInEditor, titleInEditor } = useSelector( ({wordsInEditor,titleInEditor}) => ({ wordsInEditor, titleInEditor }) );
  return (
    <Paper className="dialog">
      <div className="top">
        <Button color="secondary" variant="contained" onClick={ e => dispatch({type:'editorToggle'}) }><Cancel/></Button>
        <TextField fullWidth style={{height:'max-content'}}
          placeholder="Wordlist Name" value={titleInEditor} onChange={ e => dispatch({type:'editorTitle',value:e.target.value})}
        />
        <Button color="primary" variant="contained" onClick={ e => dispatch({type:'editorSave'}) }><Save/></Button>
      </div>
      <div className="bottom">
        <TextField fullWidth multiline variant="outlined" inputRef={ref}
          value={wordsInEditor} onChange={ e => dispatch({type:'editorChange',value:e.target.value})}
        />
      </div>
    </Paper>
  )
}

export default Words
