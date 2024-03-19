// rootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  activatedItem: persistReducer(persistConfig, reducer),
  isLoged: persistReducer(persistConfig, reducer),
  nameUser: persistReducer(persistConfig, reducer),
  typeUser: persistReducer(persistConfig, reducer),
  typeCollaborator: persistReducer(persistConfig, reducer),
  vagas: persistReducer(persistConfig, reducer),
  empresas: persistReducer(persistConfig, reducer),
  depoimentos: persistReducer(persistConfig, reducer),
  ongs: persistReducer(persistConfig, reducer),
});

export default rootReducer;