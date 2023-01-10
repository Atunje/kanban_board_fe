import axios from "axios";
import * as ENDPOINTS from "./endpoints";

export default class CardService {

    static async getAll() {
        const { data } = await axios.get(ENDPOINTS.COLUMNS);
        return data;
    }

    static async create(columnData) {
        const { data } = await axios.post(ENDPOINTS.CREATE_COLUMN, columnData);
        return data;
    }

    static async update(id, columnData) {
        const { data } = await axios.put(ENDPOINTS.UPDATE_COLUMN(id), columnData);
        return data;
    }

    static async delete(id) {
        const { data } = await axios.delete(ENDPOINTS.DELETE_COLUMN(id));
        return data;
    }
}