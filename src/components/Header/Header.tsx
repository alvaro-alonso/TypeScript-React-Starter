import * as React from 'react';
import './Header.css'

// interface headerProps {
//   class?: string,
// }

const header = <>
  <div className="navbar">
    <a className="logo" href="/"><i className="fa fa-home"></i> Home</a>
    <a className="right-corner" href="/login"><i className="fa fa-fw fa-user"></i> Login</a>
    <a className="right-corner" href="/contact"><i className="fa fa-fw fa-envelope"></i> Contact</a>
    <a className="right-corner" href="/search"><i className="fa fa-fw fa-search"></i> Search</a>
  </div>
</>

export default header;