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
        },
        deleteStudent: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(student => student.id !== action.payload)
        },
        toggleStudentStatus: (state, action: PayloadAction<string>) => {
            const student = state.list.find(s => s.id === action.payload);
            if (student) {
                student.status = student.status === 'active' ? 'paused' : 'active';
            }
        }
    }
});

export const { addStudent, deleteStudent, toggleStudentStatus } = studentsSlice.actions;
export default studentsSlice.reducer;