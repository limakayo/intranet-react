import { URL } from '../utils/Constants'

class FetchClient {
	get(param) {
		return fetch(URL + param)
			.then(response => response.json())
			.catch(err => console.log(err)) 
	}

	post(param, body) {
		return fetch(URL + param, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
		.then(response => response.json())
		.catch(err => console.log(err))
	}

	put(param, body) {
		return fetch(URL + param, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
		.then(response => response.json())
		.catch(err => console.log(err))
	}

	delete(param) {
		return fetch(URL + param, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		})
		.then(response => response.json())
		.catch(err => console.log(err))
	}
}

export default new FetchClient()