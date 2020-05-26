import React from 'react';
import Layout from "./layout";

const SavedMoviesPage = ()=>{

    return(
        <Layout >
          <div>Här kan vi vi återanvända movieslist/movie komponenter, dock ska data som skickas till komponenterna</div>
          <div>hämtas från localstorage, dvs., i denna komponent/page hämtar vi localstorage data.</div>

        </Layout>
    )

}

export default SavedMoviesPage;