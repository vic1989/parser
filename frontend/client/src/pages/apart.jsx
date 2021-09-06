import { useParams } from "react-router"
import { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../store/main.store";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const prepareApart = (apart) => {
    return {
        apart,
        prepareApart: {
            'Id': apart.id,
            'Цена': apart.price.amount + apart.price.currency,
            'Адрес': apart.location.address,
            'Ссылка': (<a target='_blank' href={apart.link}>{apart.link}</a>)
        }
    }
}

const preparePhotos = (photos) => {
    return photos.map(photo => {
        return {
            src: photo,
            width: 4,
            height: 3
        }
    })
}

const Apart = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const classes = useStyles();
    const {id} = useParams()
    const [apart, setApart] = useState(null)
    const {apartsStore} = useContext(AppContext)
    useEffect(async () => {
        const apart = await apartsStore.loadApart(id)
        setApart(prepareApart(apart))
    }, [])

    return (
        apart && <div className="apart-container">
            <h1>Апартаменты {apart.apart.location.address}</h1>
            <br/>
            <div className="apart-wrapper">
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    {Object.keys(apart.prepareApart).map((k) => (
                        <div key={k}>
                            <ListItem button>
                                <ListItemText primary={k}/>
                            </ListItem>
                            <Divider/>
                        </div>)
                    )
                    }
                </List>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    {Object.keys(apart.prepareApart).map((k) => (
                        <div key={k+'1'}>
                            <ListItem button>
                                <ListItemText primary={apart.prepareApart[k]}/>
                            </ListItem>
                            <Divider/>
                        </div>)
                    )
                    }
                </List>
            </div>
            <div className="modal-wrapper">
                <Gallery photos={preparePhotos(apart.apart.photos)} onClick={openLightbox} />
                <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={preparePhotos(apart.apart.photos).map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        </div>
    )
}

export default Apart