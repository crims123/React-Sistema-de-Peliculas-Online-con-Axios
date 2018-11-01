import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./componentes/Header";
import axios from "axios";
import Categorias from "./componentes/Categorias";
import Descripcion from "./componentes/Descripcion";
import { getGenres, getMovieListByGenreId,getMovieIdCick,similarMovies,deleteMovieIdCick } from "./api/request";

class App extends Component {

  state = {
    generos:[],
    generoPosicion1:{},
    generoSeleccionado:"",
    listadoPeliculas:[],
    detallePelicula:[],
    detallePeliculaPosicion1:[],
    peliculaSeleccionada:"",
    peliculasSimilares:{},
    idfavoritos:[],
  };


  async componentDidMount(){
    console.warn("componentDidMount");
    // consultamos los generos
    await getGenres()
    .then(response => {
      //cambiamos el estado
      this.setState({
        generos:response.data.genres,
        generoPosicion1:response.data.genres[0],
      })
    })

    // creamos la lista de peliculas por defecto la posicion 1
    const {id} =this.state.generoPosicion1;
    await getMovieListByGenreId(id)
     .then(listadefault=>{
        this.setState({listadoPeliculas:listadefault.data.results})
     })  

    // creamos la lista de peliculas por defecto la posicion 1
    getMovieIdCick(this.state.listadoPeliculas[0].id)
    .then(obtenerdetallePelicula=>{
    //console.log(idPelicula);
    this.setState({detallePelicula:obtenerdetallePelicula.data})
    })

    // creamos las peliculas similares por defecto
    similarMovies(this.state.listadoPeliculas[0].id)
    .then(obtenerPeliculasSimilares=>{
    this.setState({peliculasSimilares:obtenerPeliculasSimilares.data.results})
   })
  }

   idGenero = (idGenero)=>{
    this.setState({generoSeleccionado:idGenero})
    if (idGenero !== '8262446') {
      // consultamos la lista de peliculas cada vez que se cambia el genero
      getMovieListByGenreId(idGenero)
      .then(lista=>{
        this.setState({listadoPeliculas:lista.data.results})
     })
    }
  }

  idPelicula=async(idPelicula)=>{
    // recibimos el id de la pelicula cuando le damos click
    this.setState({peliculaSeleccionada:idPelicula,})
    //obtenemos los detalles de cada pelicula individual
    getMovieIdCick(idPelicula)
   .then(obtenerdetallePelicula=>{
    //console.log(idPelicula);
    this.setState({detallePelicula:obtenerdetallePelicula.data})})
    similarMovies(idPelicula)
   .then(obtenerPeliculasSimilares=>{
    console.log(obtenerPeliculasSimilares.data.results);
    this.setState({peliculasSimilares:obtenerPeliculasSimilares.data.results})
   })

  }

  obtenerIdFavoritos=(id)=>{   
    if(this.state.idfavoritos.length===0){
    const newGenres = [ ...this.state.generos, { name: 'Favorites', id: '8262446' } ];
    this.setState({generos: newGenres,});
    }

    getMovieIdCick(id).then((response) => {
    const favoriteMovie = response.data;
    this.setState({
        idfavoritos: [...this.state.idfavoritos, favoriteMovie],
    });
      
    });  

  }


  removerIdFavoritos=(id)=>{
    getMovieIdCick(this.state.listadoPeliculas[0].id)
    .then(obtenerdetallePelicula=>{
    this.setState({detallePelicula:obtenerdetallePelicula.data})
    })
    const { generoSeleccionado, idfavoritos, generos} = this.state;
    if (generoSeleccionado === '8262446' && idfavoritos.length === 1) {
      const newGenres = generos.filter(genre => genre.id !== '8262446');
      this.setState({generos:newGenres, generoSeleccionado: generos[0].id,
       })
      getMovieListByGenreId(generos[0].id).then((listadefault)=>{
        getMovieIdCick(listadefault.data.results[0].id)
        .then(obtenerdetallePelicula=>{
          this.setState({listadoPeliculas:listadefault.data.results, detallePelicula:obtenerdetallePelicula.data})
        })
      })
    }
    const listaFavoritos =this.state.idfavoritos;
    const eliminarFavorito=listaFavoritos.filter(eliminar=>eliminar.id !== id)
    this.setState({idfavoritos:eliminarFavorito })
  }


  render() {
    const { listadoPeliculas, generos, detallePelicula, generoSeleccionado, idfavoritos } = this.state;
    const movieList = generoSeleccionado === '8262446' ? idfavoritos : listadoPeliculas;
    return (
      <Fragment>
        <Header/>
      <div>
        <div className="menu-izquierdo">
          <Categorias
           idPelicula={this.idPelicula} 
           listapeliculas={movieList} 
           generos={generos} idGenero={this.idGenero}
           idfavoritos={this.state.idfavoritos}
            />
        </div>
        <div className="menu__derecho">
          <Descripcion 
          peliculasSimilares={this.state.peliculasSimilares}
          detallePelicula={detallePelicula} 
          obtenerIdFavoritos={this.obtenerIdFavoritos}
          removerIdFavoritos={this.removerIdFavoritos}
          />
        </div>
      </div>       
     </Fragment>
    );
  }
}

export default App;
