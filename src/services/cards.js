import axios from "axios";
import * as ENDPOINTS from "./endpoints";

export default class CardService {

    static async create(cardData) {
        try {
            const { data } = await axios.post(ENDPOINTS.CREATE_CARD, cardData);
            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    static async update(id, cardData) {
        try {
            const { data } = await axios.put(ENDPOINTS.UPDATE_CARD(id), cardData);
            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    static async shift(id, details) {
        try {
            const { data } = await axios.patch(ENDPOINTS.SHIFT(id), details);
            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    static async addToColumn(id, details) {
        try {
            const { data } = await axios.patch(ENDPOINTS.ADD_TO_COLUMN(id), details);
            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}