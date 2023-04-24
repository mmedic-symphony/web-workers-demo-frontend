import { useState } from "react";
import { Track, UPLOAD_STATUS } from "../../../models/Track";
import styles from './singleTrack.module.scss';
import { WorkerUploadStatusMessage } from "../../../models/workerMessage/WorkerMessage";

type Props = {
  track: Track;
}

function renderAction(status: UPLOAD_STATUS, handleUpload: (e: React.MouseEvent) => void) {
  switch (status) {
    case UPLOAD_STATUS.PENDING:
      return <button onClick={handleUpload}>Upload</button>
    case UPLOAD_STATUS.IN_PROGESS:
      return <div>Uploading...</div>
    case UPLOAD_STATUS.COMPLETED:
      return <button onClick={handleUpload}>Re-Upload</button>
    case UPLOAD_STATUS.FAILED:
      return <button onClick={handleUpload}>Re-Upload</button>
    default:
      break;
  }
}

function renderStatus(status: UPLOAD_STATUS, uploadProgress?: number) {
  switch (status) {
    case UPLOAD_STATUS.PENDING:
      return <div>Waiting</div>
    case UPLOAD_STATUS.IN_PROGESS:
      return <div>{uploadProgress}%</div>
    case UPLOAD_STATUS.COMPLETED:
      return <div>Completed</div>
    case UPLOAD_STATUS.FAILED:
      return <div>Failed</div>
    default:
      break;
  }
}

export function SingleFile({track}: Props) {
  const worker = new Worker(new URL("worker.ts", import.meta.url))
  const [trackUploadStatus, setUploadStatus] = useState(track.status);
  const [uploadProgress, setUploadProgress] = useState(track.progress);

  worker.addEventListener("message", (e: MessageEvent<WorkerUploadStatusMessage>) => {
    if (e.data.status === UPLOAD_STATUS.COMPLETED) {

      track.status = UPLOAD_STATUS.COMPLETED;
      worker.terminate();

    } else if (e.data.status === UPLOAD_STATUS.IN_PROGESS) {

      track.status = UPLOAD_STATUS.IN_PROGESS;
      track.progress = e.data.progress;
      setUploadProgress(track.progress);

    } else {

      track.status = UPLOAD_STATUS.FAILED;
      worker.terminate();
      
    }
    setUploadStatus(track.status);
  });
  
  async function handleUpload(e: React.MouseEvent) {
    setUploadStatus(UPLOAD_STATUS.IN_PROGESS);
    e.preventDefault();
    e.stopPropagation();
    worker.postMessage({track: track})
  }

  return (
    <div className={styles.singleTrack} key={track.trackName}>
      <div className={styles.trackName}>{track.trackName}</div>
      <div className={styles.trackStatus}>{renderStatus(trackUploadStatus, uploadProgress)}</div>
      <div className={styles.trackAction}>
        {
          renderAction(track.status, handleUpload)
        }
      </div>
    </div>
  )
}