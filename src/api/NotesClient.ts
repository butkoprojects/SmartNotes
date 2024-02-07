import axios, {AxiosResponse} from 'axios';
import {Note} from "../infrastructure/Note";

export class NotesClient {

    async getNotes(id: string): Promise<AxiosResponse> {
        return axios.get(`http://localhost:8080/notes?id=${id}`);
    }

    async getLabels(): Promise<AxiosResponse> {
        return axios.get(`http://localhost:8080/notes/open`);
    }

    async updateNoteStatus(id: string, status: string): Promise<void> {
        await axios.put(`http://localhost:8080/notes/${id}/status/${status}`, {})
    }

    async createUpdateNote(note: Note): Promise<void> {
        await axios.post(`http://localhost:8080/notes`, note)
    }

    async updateNote(note: Note): Promise<void> {
        await axios.put(`http://localhost:8080/notes`, note)
    }

    async updateNoteName(id: string, newName: string): Promise<void> {
        await axios.put(`http://localhost:8080/notes/${id}/name/${newName}`, {})
    }

    async deleteNote(id: string): Promise<void> {
        await axios.delete(`http://localhost:8080/notes/${id}`)
    }
}