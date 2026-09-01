import { configureStore, combineReducers } from "@reduxjs/toolkit";
import studentsReducer from './studentsSlice'

const rootReducer = combineReducers({
    students: studentsReducer,
})

const loadFromLocalStorage = () => {
    try {
        const savedState = localStorage.getItem('reduxState');
        if (savedState === null) return undefined;
        return JSON.parse(savedState)
    } catch (error) {
        console.log('Ошибка при загрузке данных из localStorage', error);
        return undefined;
    }
}

const saveToLocalStorage = (state: any) => {
    try {
        const stateToSave = JSON.stringify(state);
        localStorage.setItem('reduxState', stateToSave);
    } catch (error) {
        console.log('Ошибка при сохранении данных в localStorage', error);
    }
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadFromLocalStorage(),
})

store.subscribe(() => {
    saveToLocalStorage(store.getState());
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;