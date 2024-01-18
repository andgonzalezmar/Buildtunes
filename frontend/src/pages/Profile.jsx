import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
	const { user, token } = useAuth();

	const [cancion, setCancion] = useState('')
	const [canciones, setCanciones] = useState([])

	function handleSearch(e){
		e.preventDefault()
		setCancion('')
		getSong(cancion)
	}

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '053c5ead34msh03bc7d4df0b177dp13754cjsn354895669d82',
			'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
		}
	};

	async function getSong(){
		try {
			let url = 'https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=20&numberOfTopResults=5'
			let data = await fetch(url,options)
			let res = await data.json()
			console.log(res.tracks.items)
			setCanciones(res.tracks.items)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className="text-6xl font-bold text-slate-600">¡Hora de escuchar musica!</div>
			<hr className="bg-slate-400 h-1 w-full my-4" />
			<div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
				<h2>Buscador de canciones</h2>
				<form
					className="space-y-4 md:space-y-6"
					action="#"
					onSubmit={handleSearch}>
					<div>
						<input
							type="text"
							value={cancion}
							onChange={e => setCancion(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Escribe una cancion"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
						Buscar
					</button>
				</form>
				{canciones.map((cancion, index) => (
					<>
					<div key={index}>
						<img src={cancion.data.albumOfTrack.coverArt.sources[0].url} alt="" />
						<h2>{cancion.data.name}</h2>
					</div>
					</>
				))}
			</div>
		</>
	);
}