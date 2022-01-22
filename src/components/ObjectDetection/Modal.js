import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function ModalComponent({ imgCanvas }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <img src={imgCanvas} alt='' id="imgModal" crossOrigin='anonymous' onClick={handleOpen} style={{ cursor: 'pointer' }}></img>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Object Detection Result
            </Typography>
            <img src={imgCanvas} alt='' id="imgModal" crossOrigin='anonymous'></img>
          </center>
        </Box>
      </Modal>
    </div>
  );
}
