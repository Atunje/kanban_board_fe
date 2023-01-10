const baseUrl = process.env.VUE_APP_API_URL;

const CARDS = baseUrl + 'cards';
export const CREATE_CARD = `${CARDS}`;
export const UPDATE_CARD = id => `${CARDS}/${id}`;
export const SHIFT = id => `${CARDS}/${id}/shift`;
export const ADD_TO_COLUMN = id => `${CARDS}/${id}/add-to-column`;

export const COLUMNS = baseUrl + 'columns';
export const CREATE_COLUMN = `${COLUMNS}`;
export const DELETE_COLUMN = id => `${COLUMNS}/${id}`;

export const SQL_DUMP = baseUrl + 'sql-dump';