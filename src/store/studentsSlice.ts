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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла неизвестная ошибка';
            })
    }
});

export const { addStudent, deleteStudent, toggleStudentStatus } = studentsSlice.actions;
export default studentsSlice.reducer;