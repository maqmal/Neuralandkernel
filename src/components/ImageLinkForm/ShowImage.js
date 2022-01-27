import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import './ShowImage.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ShowImage = ({ image, prediction }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let imgStyle;
    console.log(prediction)
    if (prediction.length === 0 || prediction === '') {
        imgStyle = {
            cursor: 'pointer',
            paddingBottom: '20px',
            display: 'none'
        }
    } else {
        imgStyle = {
            cursor: 'pointer',
        }
    }

    return (
        <div>
            <center>
                {prediction === '' ? <p><CircularProgress /></p> :
                    prediction === 'not found' ? <p>{'No object detected. Sorry :('}</p> : prediction.length <= 5 ? prediction.map(data =>
                        <span key={data.score} style={{ fontSize: '2vh' }}>{`${capitalizeFirstLetter(data.class)}: ${parseFloat(data.score).toFixed(2) * 100 + "%"}`}</span>)
                        :
                        <div>
                            <p>Found {prediction.length} objects!</p>
                        </div>
                }
                <div className='image-container'>
                    <img src={image} alt='' onClick={handleOpen} style={imgStyle} width={'800px'} />
                    {prediction === '' ? '' :
                        prediction === 'not found' ? '' :
                            prediction.map(data =>
                                <div key={data.score} className='bounding-box'
                                    style={{ top: data.bbox[1], right: data.bbox[0], bottom: data.bbox[1], left: data.bbox[0] }} onClick={handleOpen} >
                                </div>)
                    }
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <center>
                            <div style={{ display: 'flex' }}>
                                {prediction === '' ? <p><CircularProgress /></p> :
                                    prediction === 'not found' ? <p>{'No object detected. Sorry :('}</p> :
                                        prediction.map(data =>
                                            <p key={data.score} style={{ fontSize: '2vh' }}>{`${capitalizeFirstLetter(data.class)}: ${parseFloat(data.score).toFixed(2) * 100 + "%"}`}</p>)
                                }
                            </div>
                            <img src={image} alt='' />
                        </center>
                    </Box>
                </Modal>
            </center>
        </div>
    );
}

export default ShowImage;