import { Track, UPLOAD_STATUS } from "../Track";

export interface WorkerTrackMessage {
  track: Track
}

export interface WorkerUploadStatusMessage {
  status: UPLOAD_STATUS;
  progress: number;
}