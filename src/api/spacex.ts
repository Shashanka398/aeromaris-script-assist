import axios from 'axios';

const API_BASE = 'https://api.spacexdata.com/v4';

export const getShips = () => axios.get(`${API_BASE}/ships`);
export const getShipById = (id: string) => axios.get(`${API_BASE}/ships/${id}`);

export const getRockets = () => axios.get(`${API_BASE}/rockets`);
export const getRocketById = (id: string) => axios.get(`${API_BASE}/rockets/${id}`); 