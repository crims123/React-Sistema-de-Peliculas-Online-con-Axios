import React, { Component } from 'react';

export class PeliculaMenuIzquierdo extends Component {

	render() {

const {poster_path,id,title,release_date}= this.props.pelicula;

let url=`https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster_path}`;	
let url2=`https://www.themoviedb.org/movie/${id}`;


		return (
			<div >
					<img onClick={()=>this.props.idPelicula(id)} className="menu-izquierdo__img" src={url}/>
					<p >{title}</p>
					<p>{release_date}</p>
					
					
			</div>
		);
	}
}

export default PeliculaMenuIzquierdo;