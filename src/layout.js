import React from 'react';

const Layout = ({children})=>{

    return(
        <main className="layout-container">
          <header>
            en meny här? Exempelvis: "Hem"  "Sparade Filmer"
          </header>

        <div className="main-container">
            {children}
        </div>

        </main>
    )

}

export default Layout;