//gerenciador de estados
const initialState = {
    isLoged: false,
    activatedItem: '/',
    windowWidth: 0,
    menuOpen: false,
    vagas: [],
    empresas: [],
    depoimentos: [],
    ongs: [],
}

const useReducer = ( state = initialState, action ) => {
    switch(action.type){
        case 'ChangeLoged':
            return { ...state, isLoged: action.payload };
        case 'ChangeActivatedItem':
            return { ...state, activatedItem: action.payload };
        case 'ChangeWindowWidth':
            return { ...state, windowWidth: action.payload };
        case 'ChangeMenuOpen':
            return { ...state, menuOpen: !state.menuOpen };
        case 'setVagas':
            return { ...state, vagas: action.payload };
        case 'setEmpresas':
            return { ...state, empresas: action.payload };
        case 'setDepoimentos':
            return { ...state, depoimentos: action.payload };
        case 'setOngs':
            return { ...state, ongs: action.payload };
        default:
            return state;
    }
}

export default useReducer;