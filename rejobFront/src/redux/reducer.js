//gerenciador de estados
const initialState = {
    isLoged: false,
    activatedItem: '/',
    windowWidth: 0,
    menuOpen: false,
    profileOpen: false,
    visibilityPassword: false,
    visibilityRepeatPassword: false,
    coincidir: false,
    qCaracteres: false,
    maiusculo: false,
    minusculo: false,
    numero: false,
    simbolo: false,
    typeOfCompany: null,
    estado: null,
    cidade: null,
    statesAndCityes: [],
    vagas: [],
    empresas: [],
    depoimentos: [],
    ongs: [],
    states: [],
    cityes: [],
    habilidades: [
        {name: "Teste", level: "Intermediário"},
        {name: "Teste", level: "Intermediário"}
    ],
    experiencias: [],
    modalOpen: false,
    nameHability: '',
    levelHability: null,
    typeUser: null,
    nameUser: null,
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
        case 'ChangeVisibilityPassword':
            return { ...state, visibilityPassword: !state.visibilityPassword };
        case 'ChangeVisibilityRepeatPassword':
            return { ...state, visibilityRepeatPassword: !state.visibilityRepeatPassword };
        case 'TesteCoincidencia':
            return { ...state, coincidir: action.payload };
        case 'TesteQuantCaracteres':
            return { ...state, qCaracteres: action.payload };
        case 'setMaiusculo':
            return { ...state, maiusculo: action.payload };
        case 'setMinusculo':
            return { ...state, minusculo: action.payload };
        case 'setNumeros':
            return { ...state, numero: action.payload };
        case 'setSimbolos':
            return { ...state, simbolo: action.payload };
        case 'setStates':
            return { ...state, states: action.payload };
        case 'setCityes':
            return { ...state, cityes: action.payload };
        case 'setTypeOfCompany':
            return { ...state, typeOfCompany: action.payload };
        case 'setEstado':
            return { ...state, estado: action.payload };
        case 'setCidade':
            return { ...state, cidade: action.payload };
        case 'setStatesAndCityes':
            return{ ...state, statesAndCityes: action.payload };
        case 'setHabilidades':
            return{ ...state, habilidades: [...state.habilidades, action.payload] };
        case 'setExperiencias':
            return{ ...state, experiencias: [...state.experiencias, action.payload] };
        case 'editHabilidade':
                const {index, updateSkill} = action.paylod;
                const newHabilidades = [...state.habilidades];
                newHabilidades[index] = updateSkill;
            return{ ...state, habilidades: newHabilidades };
        case 'deleteHabilidade':
            return{ ...state, experiencias: [...state.experiencias, action.payload] };
        case 'openModal':
            return{ ...state, modalOpen: !state.modalOpen };
        case 'setNameHability':
            return{ ...state, nameHability: action.payload };
        case 'setLevelHability':
            return{ ...state, levelHability: action.payload };
        case 'setNameUser':
            return{ ...state, nameUser: action.payload };
        case 'setTypeUser':
            return{ ...state, typeUser: action.payload };
        default:
            return state;
    }
}

export default useReducer;