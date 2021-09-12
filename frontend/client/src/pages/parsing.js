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
let parsingContainer = React.createRef();
const Parsing = () => {

    const classes = useStyles();
    const [text, setText] = useState([])
    const [disabled, setDisabled] = useState(false)

    const parse = () => {
        let eventSource
        setDisabled(true)
        const fireError = () => {
            eventSource.close()
            onMessage('Ошибка подключения к серверу')
            setDisabled(false)
        }
        const timeOut = setTimeout(() => {
            fireError()
        }, 5000)
        setText([])
        const onMessage = (msg) => {
            clearTimeout(timeOut)
            if (msg === 'process end') {
                eventSource.close()
                setDisabled(false)
                return
            }
            s.push(msg)
            setText([...s])
            parsingContainer.current.scrollTop = parsingContainer.current.scrollHeight;
        }
        try {
            eventSource = new EventSource("http://localhost:6001/api/v1/aparts/parse");
            eventSource.onmessage = e => onMessage(JSON.parse(e.data))
            eventSource.onerror = e => () => {
                onMessage('Ошибка подключения к серверу')
                setDisabled(false)
            }
        } catch (e){
            onMessage('Ошибка подключения к серверу')
            setDisabled(false)
        }
    }

    return (
        <div style={{width: '80%', height: '100%', textAlign: 'left'}}>
            <div className={classes.root}>
                <Button variant="contained" disabled={disabled} onClick={parse} color="primary">
                    Начать парсинг
                </Button>
            </div>
            <div ref={parsingContainer} className="parsing-container">{text.map(string => (
                <div>
                    {string}
                    <br/>
                </div>
            ))}</div>
        </div>
    )
}

export default Parsing