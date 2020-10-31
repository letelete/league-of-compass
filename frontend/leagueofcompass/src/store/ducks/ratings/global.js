const { createSlice } = require( "@reduxjs/toolkit" );
const { apiCallBegan } = require( "../../actions/api" );

const initialState = {
    champions: {},
    lastFetchedAt: null,
}


const slice = createSlice({
    name: 'ratings/global' 
    initialState,
    reducers: {
        championsFetched: (state,{payload}) => {
            // TODO: add champion ratings to the state
        }
    }
})

const fetchChampions = () => (dispatch, getState) => dispatch(apiCallBegan({
    
}))