import React,{useEffect,useState} from 'react';
import Layout from "./layout";

import { useRouteMatch,Link } from 'react-router-dom';


const MoviePage = ()=>{
    const match = useRouteMatch();
    useEffect(()=>{


        fetch("https://api.themoviedb.org/3/movie/" + match.params.id + "/videos?api_key=d1426caae4746a010983a3dbcf8acc35&language=en-US" )
        .then(res => res.json())
        .then(
          (data) => {
           

            //
            
          },
        
          (error) => {
          }
        )



    },[match.params.id])

    return(
        <Layout >
          <div>{match.params.id}</div>
          <div>Vi gör nytt API-anrop för att hämta mer info enskilde filmen här</div>
          <div>plus gör det möjligt för användaren att spara filmen till localstorage</div>


        </Layout>
    )

}

export default MoviePage;