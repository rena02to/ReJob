//gerenciador de estados
const initialState = {
    isLoged: false,
    activatedItem: '/',
    windowWidth: 0,
    menuOpen: false,
    profileOpen: false,
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
            return { ...state, menuOpen: action.payload };
        case 'setVagas':
            return { ...state, vagas: action.payload };
        case 'setEmpresas':
            return { ...state, empresas: action.payload };
        case 'setDepoimentos':
            return { ...state, depoimentos: action.payload };
        case 'setOngs':
            return { ...state, ongs: action.payload };
        case 'ChangeProfileOpen':
            return { ...state, profileOpen: action.payload };
        default:
            return state;
    }
}

export default useReducer;