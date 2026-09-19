import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { fetchStudents } from '../store/studentsSlice';

const StudentProfile = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const { list: students, isLoading } = useAppSelector((state) => state.students)
    useEffect(() => {
        if (students.length === 0) {
            dispatch(fetchStudents());
        }
    }, [dispatch, students.length]);

    const student = students.find((s) => String(s.id) === String(id))

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
            <Link to="/students"
                style={{
                    display: 'inline-block',
                    marginBottom: '20px',
                    textDecoration: 'none',
                    color: '#3b82f6',
                    fontWeight: 'bold'
                }}>
                ← Назад к списку
            </Link>

            <div style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}
                >
                    <h2 style={{ margin: 0, color: '#1e293b' }}>{student.name}</h2>
                    <span style={{
                        padding: '6px 12px',
                        backgroundColor: student.status === 'active' ? '#dcfce3' : '#fee2e2',
                        color: student.status === 'active' ? '#166534' : '#991b1b',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>{student.status === 'active' ? 'Активен' : 'Пауза'}</span>
                </div>


                <div style={{
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>Язык</span>
                        <span style={{ color: '#0f172a' }}>{student.language}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>Цель:</span>
                        <span style={{ color: '#0f172a' }}>{student.targetExam}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>Текущая тема:</span>
                        <span style={{ color: '#0f172a' }}>{student.currentTopic}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile;