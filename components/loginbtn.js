import React from 'react';

import Link from 'next/link';

class Loginbtn extends React.Component {




  render() {
    return (<div>
      {
        this.props.isLoggedIn
          ? <button type="submit" className="btn nav-disp" onClick={this.props.handleSignOut}><img src="/static/images/signout-icon.png" className="nav-icon"/></button>
          : <Link href='/login'>
              <a title='Login page'>
                <button className="btn"><img src="/static/images/signin.png" className="nav-icon"/></button>
              </a>
            </Link>

      }
    </div>)
  }
}

export default Loginbtn
