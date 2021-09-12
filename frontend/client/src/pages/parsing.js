import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

let s = []
const Parsing = () => {

    const classes = useStyles();
    const [text, setText] = useState([])
    const [disabled, setDisabled] = useState(false)
    const parse = () => {
        setDisabled(true)
        setText([])
        const eventSource = new EventSource("http://localhost:6001/api/v1/aparts/parse");
        eventSource.onmessage = e => onMessage(JSON.parse(e.data))
        const onMessage = (msg) => {
            s.push(msg)
            console.log(s)
            setText([...s])
            // eventSource.close()
        }
    }

    return (
        <div style={{width: '80%', height: '100%', textAlign: 'left'}}>
            <div className={classes.root}>
                <Button variant="contained" disabled={disabled} onClick={parse} color="primary">
                    Начать парсинг
                </Button>
            </div>
            <div className="parsing-container">{text.map(string => (
                <div>
                    {string}
                    <br/>
                </div>
            ))}</div>
        </div>
    )
}

export default Parsing