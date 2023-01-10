import axios from "axios";
import * as ENDPOINTS from "./endpoints";

export default class CardService {

    static async create(cardData) {
        const { data } = await axios.post(ENDPOINTS.CREATE_CARD, cardData);
        return data;
    }

    static async update(id, cardData) {
        const { data } = await axios.put(ENDPOINTS.UPDATE_CARD(id), cardData);
        return data;
    }

    static async shift(id, details) {
        const { data } = await axios.patch(ENDPOINTS.SHIFT(id), details);
        return data;
    }

    static async addToColumn(id, details) {
        const { data } = await axios.patch(ENDPOINTS.ADD_TO_COLUMN(id), details);
        return data;
    }
}