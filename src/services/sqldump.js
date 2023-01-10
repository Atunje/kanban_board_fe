import axios from "axios";
import * as ENDPOINTS from "./endpoints";

export default class SqlDumpService {

    static async dump() {
        const response = await axios.get(ENDPOINTS.SQL_DUMP);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'db-dump.csv');
        document.body.appendChild(link);
        link.click();
    }

}