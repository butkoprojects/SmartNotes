import axios, {AxiosResponse} from 'axios';
import { Book } from '../infrastructure/Book';

export class BooksClient {

    async getBook(id: string): Promise<AxiosResponse> {
        return axios.get(`http://localhost:8080/books/${id}`);
    }

    async getBooks(): Promise<AxiosResponse> {
        return axios.get(`http://localhost:8080/books`);
    }

    async createBook(book: Book): Promise<AxiosResponse> {
        return axios.post(`http://localhost:8080/books`, book);
    }
}