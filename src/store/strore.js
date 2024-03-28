import {configureStore, createSlice} from '@reduxjs/toolkit'
const tableDataSlice = createSlice({
    name:'table',
    initialState:{tableData:[]},
    reducers:{
       addData:(state,action)=>{
        // console.log(action);
        if(action.payload){
          state.tableData = [...state.tableData,...action.payload]      
        }
        return state;
       }
    }
})

 const store = configureStore({
    reducer:{
      tableDataStore:tableDataSlice.reducer
    }
})
export default store;
export const tableDataAction = tableDataSlice.actions;