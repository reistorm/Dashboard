import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface Student {
    id: string;
    name: string;
    language: 'English' | 'Japanese';
    targetExam: 'IELTS' | 'TOEFL' | 'JLPT N4';
    currentTopic: string;
    status: 'active' | 'paused';
}

interface StudentsState {
    list: Student[];
    isLoading: boolean;
    error: string | null;
}

const initialState: StudentsState = {
    list: [],
    isLoading: false,
    error: null,
};

export const fetchStudents = createAsyncThunk<Student[]>(
    'students/fetchStudents',
    async () => {
        const response = await fetch('http://localhost:3001/students');
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные с сервера');
        }
        const data = await response.json();
        return data;
    }
)

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action: PayloadAction<Student>) => {
            state.list.push(action.payload)
        }
    }
});

export const { addStudent } = studentsSlice.actions;
export default studentsSlice.reducer;