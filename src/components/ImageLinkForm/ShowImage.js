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

    var size = ''
    if (prediction.length === 0 || prediction === '') {

    } else {
        const img = document.getElementById('img');
        img.src = image;
        const c = document.getElementById('canvas');
        const context = c.getContext('2d');
        context.clearRect(0, 0, c.width, c.height);
        context.drawImage(img, 0, 0);
        context.font = '10px Arial';

        for (let i = 0; i < prediction.length; i++) {
            context.beginPath();
            context.rect(...prediction[i].bbox);
            context.lineWidth = 1;
            context.strokeStyle = 'green';
            context.fillStyle = 'green';
            context.stroke();
            context.fillText(
                prediction[i].score.toFixed(3) + ' ' + prediction[i].class, prediction[i].bbox[0],
                prediction[i].bbox[1] > 10 ? prediction[i].bbox[1] - 5 : 10);
        }
        size = [img.width, img.height]
    }

    return (
        <div>
            <center>
                {prediction === '' ? <p><CircularProgress /></p> :
                    prediction === 'not found' ? <p>{'No object detected. Sorry :('}</p> :
                        prediction === 'link error' ? <p>{'Error retrieving image format'}</p> :
                            prediction.length <= 5 ? prediction.map(data =>
                                <span key={data.score} style={{ fontSize: '2vh' }}>{`${capitalizeFirstLetter(data.class)}: ${parseFloat(data.score).toFixed(2) * 100 + "% "}`}</span>)
                                :
                                <div>
                                    <p>Found {prediction.length} objects!</p>
                                </div>
                }
                <div className='image-container'>
                    <img id="img" style={{ display: 'none' }} alt='' />
                    <canvas id="canvas" width={size[0]} height={size[1]} onClick={handleOpen} style={{ cursor: 'pointer' }}></canvas>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex' }}>
                            {prediction === '' ? <p><CircularProgress /></p> :
                                prediction === 'not found' ? <p>{'No object detected. Sorry :('}</p> :
                                    prediction === 'link error' ? <p>{'Error retrieving image format'}</p> :
                                        prediction.map(data =>
                                            <p key={data.score} style={{ fontSize: '2vh' }}>{`${capitalizeFirstLetter(data.class)}: ${parseFloat(data.score).toFixed(2) * 100 + "%"}`}&nbsp;</p>)
                            }
                        </div>
                        <img src={image} alt='' />
                    </Box>
                </Modal>
            </center>
        </div>
    );
}

export default ShowImage;