import { createSlice } from '@reduxjs/toolkit';

interface SearchResult {
    id: string;
    label: string;
    path: string; // URL or route to navigate to
}

interface SearchState {
    query: string;
    results: SearchResult[];
}

const initialState: SearchState = {
    query: '',
    results: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        },
        clearResults: (state) => {
            state.results = [];
        },
    },
});

export const { setQuery, setResults, clearResults } = searchSlice.actions;
export default searchSlice.reducer;