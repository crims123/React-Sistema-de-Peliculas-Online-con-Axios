import React, { Component } from 'react';
import PeliculasSimilares from "./PeliculasSimilares";

export class Descripcion extends Component {


	
render() {
const {title,overview,videos,id,backdrop_path} = this.props.detallePelicula;	
const videoId = videos && videos.results && videos.results[0] && videos.results[0].key;

let urlvideo=`https://www.youtube.com/embed/${videoId}`;
let urlfondo=`https://image.tmdb.org/t/p/w600_and_h900_bestv2${backdrop_path}`;
var divStyle = {
  backgroundImage: 'url(' + urlfondo + ')',  
  
  
};


		return (
		<div  className="menu-derecho">
			<div className="menu-derecho__cajaVideo">
			{videoId ?
			 <iframe   className="menu-derecho__cajaVideo-trailer" src={urlvideo
			 } frameborder="0" allowfullscreen=""></iframe> : "no hay trailer" }
				

			</div>

			<div className="menu-derecho__cajaDetalles">
				<h1 className="menu-derecho__cajaDetalles-titulo">{title}</h1>
				<button onClick={()=>this.props.obtenerIdFavoritos(id)} className="menu-derecho__cajaDetalles-botonA">ADD TO FAVORITES</button>
				<button onClick={()=>this.props.removerIdFavoritos(id)} className="menu-derecho__cajaDetalles-botonB">REMOVE</button>
				<p className="menu-derecho__cajaDetalles-parrafo">{overview}</p>
				<h1 className="menu-derecho__cajaDetalles-titulo">Similar Movies</h1>
				{Object.keys(this.props.peliculasSimilares).map(separar=>(
					<PeliculasSimilares 
					key={separar}
		    		peliculasSimilares = {this.props.peliculasSimilares[separar]}
		    		/>
		    		))}
			</div>
	</div>
		);
	}
}

export default Descripcion;