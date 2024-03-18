const initialState = {
    isLoged: false,
    typeUser: null,
    typeCompany: null,
    nameUser: null,
    activatedItem: '/',
    ongs: [],
    depoimentos: [],
    empresas: [],
    vagas: [],
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ChangeLoged':
            return { ...state, isLoged: action.payload };
        case 'setTypeUser':
            return{ ...state, typeUser: action.payload };
        case 'setTypeCompany':
            return{ ...state, typeCompany: action.payload };
        case 'setNameUser':
            return{ ...state, nameUser: action.payload };
        case 'ChangeActivatedItem':
            return { ...state, activatedItem: action.payload };
        case 'setOngs':
            return { ...state, ongs: action.payload };
        case 'setVagas':
            return { ...state, vagas: action.payload };
        case 'setEmpresas':
            return { ...state, empresas: action.payload };
        case 'setDepoimentos':
            return { ...state, depoimentos: action.payload };
        
        default:
            return state;
    }
};
  
export default reducer;