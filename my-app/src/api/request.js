import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "f1c776c3601bf29e512e826ffb7a24e0"

export function getGenres() {
	const url =`${baseUrl}genre/movie/list?api_key=${apiKey}`;
    return axios.get(url);
}

export function getMovieListByGenreId(genreId) {
	const url =`${baseUrl}genre/${genreId}/movies?api_key=${apiKey}`;
    return axios.get(url);
}	

export function getMovieIdCick(movieId){
	const url=`${baseUrl}movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
	return axios.get(url);
}	

export function similarMovies(idMovie) {
	const url=`${baseUrl}movie/${idMovie}/similar?api_key=${apiKey}&language=en-US&page=1`;
	
	return axios.get(url);
}

export function deleteMovieIdCick(movieId){
	const url=`${baseUrl}movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
	return axios.delete(url);
}	
