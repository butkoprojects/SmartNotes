import axios, {AxiosResponse} from 'axios';

export class HealthClient {

    async getStatus(): Promise<AxiosResponse> {
        return axios.get(`http://localhost:8080/health`);
    }
}