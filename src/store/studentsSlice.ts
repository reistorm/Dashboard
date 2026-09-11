import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const addNewStudent = createAsyncThunk<Student, Student>(
    'students/addNewStudent',
    async (newStudent) => {
        const response = await fetch('http://localhost:3001/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        });
        if (!response.ok) {
            throw new Error('Не удалось добавить ученика на сервер');
        }
        const data = await response.json();
        return data;
    }
)

export const deleteStudentFromServer = createAsyncThunk<string, string>(
    'students/deleteStudent',
    async (id) => {
        const response = await fetch(`http://localhost:3001/students/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Не удалось удалить ученика на сервер');
        }

        return id;
    }
)

export const toggleStudentStatusOnServer = createAsyncThunk<
    Student,
    { id: string; newStatus: 'active' | 'paused' }>(
        'students/toggleStatus',
        async ({ id, newStatus }) => {
            const response = await fetch(`http://localhost:3001/students/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Не удалось обновить статус на сервере');
            }

            const data = await response.json();
            return data;
        }


    )

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
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
            .addCase(addNewStudent.fulfilled, (state, action) => {
                state.list.push(action.payload)
            })
            .addCase(deleteStudentFromServer.fulfilled, (state, action) => {
                state.list = state.list.filter(student => student.id !== action.payload);
            })
            .addCase(toggleStudentStatusOnServer.fulfilled, (state, action) => {
                const updatedStudent = action.payload;
                const index = state.list.findIndex(student => student.id === updatedStudent.id)

                if (index !== -1) {
                    state.list[index] = updatedStudent;
                }
            })
    }
});

export default studentsSlice.reducer;