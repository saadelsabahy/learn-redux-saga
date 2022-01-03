import axios from 'axios';

export const getUsers = () => {
	return axios.get('https://jsonplaceholder.typicode.com/users');
};
