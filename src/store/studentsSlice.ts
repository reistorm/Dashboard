import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: StudentsState = {
    list: [
        {
            id: '1',
            name: 'Сергей Иванов',
            language: 'Japanese',
            targetExam: 'JLPT N4',
            currentTopic: 'Изучение кандзи и аудирование',
            status: 'active',
        },
        {
            id: '2',
            name: 'Мария Сидорова',
            language: 'English',
            targetExam: 'IELTS',
            currentTopic: 'Грамматика по Murphy: Past Perfect Continuous',
            status: 'active',
        }
    ]
};

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