import React,{useState} from "react"
import Layout from "./layout"
import Search from "./Search"
import MoviesList from "./MoviesList"

const Home = ()=>{


    const [movies, setMovies] = useState([]);
    const [isLoading,setIsLoading] =  useState(false);
  
  
    const searchUpdate = (searchField)=>{
  
      setIsLoading(true);
  
      fetch("https://api.themoviedb.org/3/search/movie?api_key=d1426caae4746a010983a3dbcf8acc35&query=" + searchField + "&page=1&include_adult=false")
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoading(false);
            setMovies(data.results);
          },
        
          (error) => {
          }
        )
    
      /*
        {
              cards.sort((a, b) => a.nationalPokedexNumber - b.nationalPokedexNumber).map((user, i) => {
              return ( 
                  <Card 
                      key={i} 
                      id={cards[i].id} 
                      name={cards[i].name}
                      image={cards[i].imageUrl}
                      nationalPokedexNumber={cards[i].nationalPokedexNumber}
                      saveCard={saveCard}
                  />
                  );
              })
          }*/ 
    }
    return(
        <Layout>

        <Search updateSearch={searchUpdate}/>
  
        {isLoading ? "": 
  
          <MoviesList moviesList={movies} />
         }
  
   
      </Layout>
    )
}


export default Home;



