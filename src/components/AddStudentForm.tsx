import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addNewStudent, type Student } from "../store/studentsSlice";

const AddStudentForm = () => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [language, setLanguage] = useState<'English' | 'Japanese'>('English');
    const [targetExam, setTargetExam] = useState<'IELTS' | 'TOEFL' | 'JLPT N4'>('IELTS');
    const [currentTopic, setCurrentTopic] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !currentTopic.trim()) return;

        const newStudent: Student = {
            id: Date.now().toString(),
            name: name,
            language: language,
            targetExam: targetExam,
            currentTopic: currentTopic,
            status: 'active',
        };

        dispatch(addNewStudent(newStudent));

        setName('');
        setCurrentTopic('');
    }
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                maxWidth: '400px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginTop: '30px'
            }}
        >
            <h3 style={{ margin: 0 }}>Новый студент</h3>

            <input
                type="text"
                placeholder="ФИО студента"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'English' | 'Japanese')}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                <option value="English">Английский</option>
                <option value="Japanese">Японский</option>
            </select>

            <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value as 'IELTS' | 'TOEFL' | 'JLPT N4')}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="JLPT N4">JLPT N4</option>
            </select>

            <input
                type="text"
                placeholder="Текущая тема"
                value={currentTopic}
                onChange={(e) => setCurrentTopic(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <button
                type="submit"
                style={{
                    padding: '10px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Добавить студента
            </button>
        </form>
    )
}

export default AddStudentForm;