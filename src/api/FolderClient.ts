import { Folder } from "../infrastructure/Folder";
import axios, {AxiosResponse} from 'axios';

export type FolderRequest = {
    folderId?: string,
    parentId: string,
    label: string
}

export class FolderClient {

    async createUpdateFolder(request: FolderRequest): Promise<void> {
        await axios.post(`http://localhost:8080/folders`, request)
    }

    async updateName(id: string, newName: string): Promise<void> {
        await axios.put(`http://localhost:8080/folders/${id}/name/${newName}`, {})
    }

    async delete(id: string): Promise<void> {
        await axios.delete(`http://localhost:8080/folders/${id}`)
    }
}