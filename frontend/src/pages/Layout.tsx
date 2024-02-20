import { Outlet, Link } from "react-router-dom";
import './pages.css';

const Layout = () => {
  const imageUrl = 'https://codahosted.io/packs/17850/unversioned/assets/COVER/42a1579a4805a59d33d87008531298d4f259eb614762eef35dc64c7176b3d50c081f3e315a5f7f69c26dfb7e963ce14360ec55b88585329a4948691a2ca7ed76a2874548c3c2f9722c903aad518d88c5027aa027d458b1cebc97ce2eec1fb85166b4f50d';

  return (
    <>
      <nav className="navigation_bar">
        {/* Wrap the image with a Link component to make it clickable and redirect to the home page */}
        <Link to="/">
          <img src={imageUrl} className="oneai_image" alt="Home"/>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/turns">Annotate</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
