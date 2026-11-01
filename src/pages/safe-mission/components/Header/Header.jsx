import './Header.css';

// Full-screen hero video (not a site header: the site navbar floats over it). The app's
// videos/safemission.mp4 is byte-for-byte the site's public/vid1.mp4, so that file is used.
export default function Header() {
  return (
    <header className="header-section">
      <video
        className="header-video"
        src="/vid1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </header>
  );
}
