import React, { Component,Fragment } from 'react';

export class PeliculasSimilares extends Component {
	render() {
		const{title,poster_path,release_date}=this.props.peliculasSimilares;
		let url=`https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster_path}`;
		const nombre =title.substr(0,10);
		return (
			<Fragment>

				<div className="menu-derecho__cajaDetalles-cajaPeliculaSimilares col-lg-3 col-md-6 col-sm-6 col-xs-6">
				<img className="menu-derecho__cajaDetalles-imagenes" src={url}/>
					<div clasName="menu-derecho__cajaDetalles-texto">
						<h4 className="menu-derecho__cajaDetalles-tituloPelicula">{nombre}</h4>
						<span>{release_date}</span>
					</div>
				
				
				</div>
			</Fragment>
		);
	}
}

export default PeliculasSimilares;
