import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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

    return (
        <div>
            {prediction === '' ?
                <div>
                    <p><CircularProgress /></p>
                    <img src={image} alt='' onClick={handleOpen}
                        style={{ cursor: 'pointer', paddingTop: '20px', paddingBottom: '40px' }}
                        width={'330px'} height={'330px'} />
                </div> :
                prediction === 'not found' ?
                    <div>
                        <p>No object detected. Sorry :(</p>
                        <img src={image} alt='' onClick={handleOpen}
                            style={{ cursor: 'pointer', paddingTop: '20px', paddingBottom: '40px' }}
                            width={'330px'} height={'330px'} />
                    </div> :
                    prediction.map(data =>
                        <div>
                            <p key={data.score}>{`${capitalizeFirstLetter(data.class)}: ${parseFloat(data.score).toFixed(2) * 100 + "%"}`}</p>
                            <img src={image} alt='' onClick={handleOpen}
                                style={{ cursor: 'pointer', paddingTop: '20px', paddingBottom: '40px' }}
                                width={'330px'} height={'330px'} />
                        </div>
                    )
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <center>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {prediction === '' ? <p><CircularProgress /></p> :
                                prediction === 'not found' ? <p>{'No object detected. Sorry :('}</p> :
                                    prediction.map(data =>
                                        <p key={data.score}>{`${capitalizeFirstLetter(data.class)}: ${parseFloat(data.score).toFixed(2) * 100 + "%"}`}</p>)
                            }
                        </Typography>
                        <img src={image} alt='' />
                    </center>
                </Box>
            </Modal>
        </div>
    );
}

export default ShowImage;