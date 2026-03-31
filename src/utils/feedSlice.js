import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {

        addFeed : (state,action) => {
            return action.payload;
        },

        removeFeed : (state,action) => {
            const newFeed = state.filter((user)=> user._id !== action.payload );
            console.log(newFeed);
            
            return newFeed;
        }
    }
})

export const {addFeed,removeFeed} = feedSlice.actions;

export default feedSlice.reducer;