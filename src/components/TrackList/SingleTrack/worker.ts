/* eslint-disable no-restricted-globals */
import axios, { AxiosHeaders, AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { Track, UPLOAD_STATUS } from "../../../models/Track";
import { WorkerTrackMessage, WorkerUploadStatusMessage } from "../../../models/workerMessage/WorkerMessage";

self.addEventListener('message', async (e: MessageEvent<WorkerTrackMessage>) => {
  const file: Track = e.data.track;
  try {
    let data = new FormData()
    if(file.originalFile){
      data.append('files', file.originalFile)
    }

    const makeHeaders = (): AxiosHeaders => {
      const headers: AxiosHeaders = new AxiosHeaders();
      headers.concat('Access-Control-Allow-Origin', 'http://localhost:4000');
      return headers;
    }

    const config: AxiosRequestConfig = {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const total = progressEvent.total || 0;
        const progress = Math.round((progressEvent.loaded*100) / total)
        const status: WorkerUploadStatusMessage = {
          status: UPLOAD_STATUS.IN_PROGESS,
          progress: progress
        }
        self.postMessage(status);
      },
      headers: makeHeaders()
    }
    

    await axios.post('http://localhost:4000/upload', data, config)
    const status: WorkerUploadStatusMessage = {
      status: UPLOAD_STATUS.COMPLETED,
      progress: 100
    }
    self.postMessage(status);
  } catch (err) {
    console.error(err);
    const status: WorkerUploadStatusMessage = {
      status: UPLOAD_STATUS.FAILED,
      progress: 0
    }
    self.postMessage(status);
  }
})