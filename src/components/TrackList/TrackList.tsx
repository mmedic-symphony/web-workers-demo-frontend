import { Track } from '../../models/Track';
import { SingleFile } from './SingleTrack/SingleTrack';
import styles from './trackList.module.scss';

type Props = {
  tracks: Track[];
}

export function TrackList({ tracks }: Props) {
  return (
    <div className={styles.trackList}>
      <div className={styles.trackTableHeader}>
        <h3 className={styles.headerItems}>Track</h3>
        <h3 className={styles.headerItems}>Status</h3>
        <h3 className={styles.headerItems}>Action</h3>
      </div>
      <div className={styles.trackTableItems}>
        {
          tracks.map((track: Track) => 
            (
              <SingleFile track={track} key={track.trackName}/>
            )
          )
        }
      </div>
    </div>
  )
}