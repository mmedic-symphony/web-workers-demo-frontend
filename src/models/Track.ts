export enum UPLOAD_STATUS { 'PENDING', 'IN_PROGESS', 'COMPLETED', 'FAILED' }

export interface Track {
  trackName: string;
  status: UPLOAD_STATUS;
  progress: number;
  originalFile: File | null
}