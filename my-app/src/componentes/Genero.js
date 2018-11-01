import React, { Component } from 'react';

export class Genero extends Component {



	render() {



// creamos un objeto destructos

const {name,id} = this.props.genero;


		return (
			
				<option  value={id}>{name}</option>
			
		);
	}
}

export default Genero;