import React from 'react';
import {Link} from "react-router-dom"
const Layout = ({children})=>{

    return(
        <main className="layout-container">
          <header>
            <nav>
                <Link to="/"> Hem</Link>
                    |
                <Link to="/saved-movies"> Sparade Filmer</Link>
            </nav>
          </header>

        <div className="main-container">
            {children}
        </div>

        </main>
    )

}

export default Layout;