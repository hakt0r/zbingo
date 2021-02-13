import { Paper } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Cancel, Save } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Words = () => {
  const dispatch = useDispatch();
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
        <TextField fullWidth multiline variant="outlined"
          value={wordsInEditor} onChange={ e => dispatch({type:'editorChange',value:e.target.value})}
        />
      </div>
    </Paper>
  )
}

export default Words
