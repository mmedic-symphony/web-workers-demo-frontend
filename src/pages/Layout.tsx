import Button from '@mui/material/Button';
import styles from './layout.module.scss';
import { TrackUploadModal } from "../components/TrackUploadModal/TrackUploadModal";
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div  className={styles.app}>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Button onClick={handleOpen}>Open modal</Button>
      <TrackUploadModal open={open} handleClose={handleClose}/>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}