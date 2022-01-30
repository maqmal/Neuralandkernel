import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import './ShowImage.css';
import React, { useEffect, useRef } from "react";

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

    const myImg = useRef(null);

    useEffect(() => {
        const img = myImg.current;
        img.src = image;
        var c = document.createElement("canvas");
        c.width = img.width
        c.height = img.height
        c.style.width = '400px'
        c.style.height = 'auto'
        c.style.cursor = 'pointer'
        c.id = "sketchpad";
        const context = c.getContext('2d');
        context.clearRect(0, 0, c.width, c.height);
        context.drawImage(img, 0, 0);
        context.font = '25px Arial';
        if (prediction === '' || prediction === 'not found' || prediction === 'link error') {

        } else {
            for (let i = 0; i < prediction.length; i++) {
                context.beginPath();
                context.rect(...prediction[i].bbox);
                context.lineWidth = 4;
                context.strokeStyle = 'green';
                context.fillStyle = 'blue';
                context.stroke();
                context.fillText(
                    prediction[i].score.toFixed(3) + ' ' + capitalizeFirstLetter(prediction[i].class), prediction[i].bbox[0],
                    prediction[i].bbox[1] > 10 ? prediction[i].bbox[1] - 5 : 10);
            }

        }
        c.onclick = handleOpen
        const imgCanvas = document.getElementById('img-canvas')
        imgCanvas.innerHTML = ''
        imgCanvas.appendChild(c)
    }, [image, prediction]);




    return (
        <div>
            {prediction === '' ? <p><CircularProgress /></p> :
                prediction === 'not found' ?
                    <div>
                        <p>{'No object detected. Sorry :('}</p>
                    </div> :
                    prediction === 'link error' ? <p>{'Error retrieving image format'}</p> :
                        prediction.length <= 5 ?
                            prediction.map(data =>
                                <span key={data.score} style={{ fontSize: '2vh' }}>{`${capitalizeFirstLetter(data.class)}: ${parseFloat(data.score).toFixed(2) * 100 + "% "}`}</span>)
                            :
                            <div>
                                <p>Found {prediction.length} objects!</p>
                            </div>
            }
            <img id="img" style={{ display: 'none' }} alt='' ref={myImg} />
            <div id="img-canvas" className="image-container">
                
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            ><center>
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
                </center>
            </Modal>
        </div>
    );
}

export default ShowImage;