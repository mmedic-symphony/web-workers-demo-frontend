import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TrackList } from "../TrackList/TrackList";
import { useDropzone } from 'react-dropzone';
import { Track, UPLOAD_STATUS } from "../../models/Track";
import styles from './trackuploadmodal.module.scss';
import { useState } from 'react';

type Props = {
  open: boolean;
  handleClose: () => void;
}

const modalboxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export function TrackUploadModal({open, handleClose}: Props) {

  const [tracks, setTracks] = useState<Track[]>([]);
  const {getRootProps, getInputProps} = useDropzone({
    // acceptedFiles is one file or multiple, depending how many
    // you've dragged and dropped
    onDrop: async acceptedFiles => {
      const acceptedTracks = acceptedFiles.map(file => {
        return {
          trackName: file.name,
          status: UPLOAD_STATUS.PENDING,
          progress: 0,
          originalFile: file,
        } as Track
      })
      const allTracks = [...tracks, ...acceptedTracks];
      setTracks(allTracks);
    }
  });

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalboxStyle}>
          <section className={styles.container}>
            <div {...getRootProps({className: styles.dropzone})}>
              <input {...getInputProps()} />
              <TrackList tracks={tracks} />
            </div>
          </section>
          <button onClick={handleClose}>Minimize</button>
        </Box>
      </Modal>
  )
}