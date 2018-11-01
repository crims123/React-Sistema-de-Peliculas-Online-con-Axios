import React, { Component,Fragment } from 'react';
import Genero from "./Genero";
import PeliculaMenuIzquierdo  from "./PeliculaMenuIzquierdo";

export class Categorias extends Genero {


	idGenero = e => {
 	let idGenero = e.target.value;
 	 // lo devuelvo al padre
 	this.props.idGenero(idGenero);
 };



	render() {



	
		return (
		<Fragment>
			<select onClick={this.idGenero} className="menu-izquierdo__select">
					
			{Object.keys(this.props.generos).map(separar=>(
			<Genero
			key={separar}
    		genero = {this.props.generos[separar]}
    		/>
    		))}

						
			</select>

			{Object.keys(this.props.listapeliculas).map(separar=>(
			<PeliculaMenuIzquierdo
			 key={separar}
    		pelicula = {this.props.listapeliculas[separar]}
    		idPelicula={this.props.idPelicula}
    		idfavoritos={this.props.id}
    		/>
    		))}
			

		</Fragment>
		);
	}
}

export default Categorias;