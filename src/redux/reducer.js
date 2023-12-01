//gerenciador de estados
const initialState = {
    isLoged: false,
}

const useReducer = ( state = initialState, action ) => {
    switch(action.type){
        case 'ChangeLoged':
            return { ...state, isLoged: action.payload };
        default:
            return state;
    }
}