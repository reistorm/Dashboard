import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { fetchStudents, updateStudentOnServer } from '../store/studentsSlice';

const StudentProfile = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const { list: students, isLoading } = useAppSelector((state) => state.students)

    const [isEditing, setIsEditing] = useState(false);

    const [editForm, setEditForm] = useState<{
        name: string;
        language: 'English' | 'Japanese' | '';
        targetExam: 'IELTS' | 'TOEFL' | 'JLPT N4' | '';
        currentTopic: string;
    }>({ name: '', language: '', targetExam: '', currentTopic: '' })

    useEffect(() => {
        if (students.length === 0) {
            dispatch(fetchStudents());
        }
    }, [dispatch, students.length]);

    const student = students.find((s) => String(s.id) === String(id))

    useEffect(() => {
        if (student) {
            setEditForm({
                name: student.name,
                language: student.language,
                targetExam: student.targetExam,
                currentTopic: student.currentTopic
            });
        }
    }, [student])

    const handleSave = () => {
        if (student) {
            dispatch(updateStudentOnServer({
                ...student,
                name: editForm.name,
                language: editForm.language as 'English' | 'Japanese',
                targetExam: editForm.targetExam as 'IELTS' | 'TOEFL' | 'JLPT N4',
                currentTopic: editForm.currentTopic

            }));
            setIsEditing(false);
        }
    }

    if (isLoading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка профиля...</div>;
    };

    if (!student) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
                <h2>Ученик не найден</h2>
                <Link to="/students">Вернуться к списку</Link>
            </div>
        )
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/students" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold' }}>
                ← Назад к списку
            </Link>

            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    {/* Поле имени или заголовок */}
                    {isEditing ? (
                        <input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            style={{ padding: '8px', fontSize: '24px', fontWeight: 'bold', width: '60%', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    ) : (
                        <h2 style={{ margin: 0, color: '#1e293b' }}>{student.name}</h2>
                    )}
                    <span style={{ padding: '6px 12px', backgroundColor: student.status === 'active' ? '#dcfce3' : '#fee2e2', color: student.status === 'active' ? '#166534' : '#991b1b', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                        {student.status === 'active' ? 'Активен' : 'Пауза'}
                    </span>
                </div>

                <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>Язык</span>
                        {isEditing ? (
                            <select value={editForm.language} onChange={(e) => setEditForm({ ...editForm, language: e.target.value as 'English' | 'Japanese' })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                                <option value="English">English</option>
                                <option value="Japanese">Japanese</option>
                            </select>
                        ) : <span style={{ color: '#0f172a' }}>{student.language}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>Цель:</span>
                        {isEditing ? (
                            <select value={editForm.targetExam} onChange={(e) => setEditForm({ ...editForm, targetExam: e.target.value as 'IELTS' | 'TOEFL' | 'JLPT N4' })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="JLPT N4">JLPT N4</option>
                            </select>
                        ) : <span style={{ color: '#0f172a' }}>{student.targetExam}</span>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>Текущая тема:</span>
                        {isEditing ? <input value={editForm.currentTopic} onChange={(e) => setEditForm({ ...editForm, currentTopic: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} /> : <span style={{ color: '#0f172a' }}>{student.currentTopic}</span>}
                    </div>
                </div>

                {/* 4. Кнопки управления редактированием */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Сохранить</button>
                            <button onClick={() => setIsEditing(false)} style={{ padding: '10px 20px', backgroundColor: '#e2e8f0', color: '#1e293b', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Отмена</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} style={{ padding: '10px 20px', backgroundColor: '#e2e8f0', color: '#1e293b', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Редактировать профиль</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentProfile;