import axios from "axios";
import * as ENDPOINTS from "./endpoints";

export default class CardService {

    static async getAll() {
        try {
            const { data } = await axios.get(ENDPOINTS.COLUMNS);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }

    static async create(columnData) {
        try {
            const { data } = await axios.post(ENDPOINTS.CREATE_COLUMN, columnData);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }

    static async update(id, columnData) {
        try {
            const { data } = await axios.put(ENDPOINTS.UPDATE_COLUMN(id), columnData);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }

    static async delete(id) {
        try {
            const { data } = await axios.delete(ENDPOINTS.DELETE_COLUMN(id));
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
}