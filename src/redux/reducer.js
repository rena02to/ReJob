//gerenciador de estados
const initialState = {
    isLoged: false,
    isValidData: false,
    mostrarSenhaLogin: false,
}

const useReducer = ( state = initialState, action ) => {
    switch(action.type){
        case 'ChangeLoged':
            return { ...state, isLoged: action.payload }
        case 'ChangeValidData':
            return {...state, isValidData: action.payload}
        case 'MostrarSenhaLogin':
            return {...state, mostrarSenhaLogin: !state.mostrarSenhaLogin}
        default:
            return state;
    }
}

export default useReducer;