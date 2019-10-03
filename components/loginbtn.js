import React from 'react';

import Link from 'next/link';

class Loginbtn extends React.Component {




  render() {
    return (<div>
      {
        this.props.isLoggedIn
          ? <button type="submit" className="btn btn-danger" onClick={this.props.handleSignOut}>Sign out</button>
          : <Link href='/login'>
              <a title='Login page'>
                <button className="btn">Sign in</button>
              </a>
            </Link>

      }
    </div>)
  }
}

export default Loginbtn
