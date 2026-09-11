import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { fetchStudents, deleteStudentFromServer, toggleStudentStatusOnServer } from "../store/studentsSlice";

const StudentsList = () => {
    const { list: students, isLoading, error } = useAppSelector((state) => state.students);
    const dispatch = useAppDispatch();

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch])

    const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>База студентов</h1>
            <input
                type="text"
                placeholder="Поиск по имени..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    width: '300px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
            {isLoading && (
                <div
                    style={{ padding: '20px', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}
                >
                    Загрузка данных с сервера...
                </div>
            )}
            {error && (
                <div
                    style={{ padding: '20px', textAlign: 'center', color: '#ed4444', fontWeight: 'bold' }}
                >
                    Ошибка: {error}
                </div>
            )}

            {!isLoading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '15px' }}>Имя</th>
                            <th style={{ padding: '15px' }}>Язык</th>
                            <th style={{ padding: '15px' }}>Цель</th>
                            <th style={{ padding: '15px' }}>Текущая тема</th>
                            <th style={{ padding: '15px' }}>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '15px', fontWeight: 'bold', color: '#1e293b' }}>{student.name}</td>
                                <td style={{ padding: '15px' }}>{student.language}</td>
                                <td style={{ padding: '15px' }}>{student.targetExam}</td>
                                <td style={{ padding: '15px' }}>{student.currentTopic}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        backgroundColor: student.status === 'active' ? '#dcfce3' : '#fee2e2',
                                        color: student.status === 'active' ? '#166534' : '#991b1b',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {student.status === 'active' ? 'Активен' : 'Пауза'}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => {
                                            const newStatus = student.status === 'active' ? 'paused' : 'active';
                                            dispatch(toggleStudentStatusOnServer({ id: student.id, newStatus }))
                                        }}
                                        style={{
                                            padding: '6px 10px',
                                            backgroundColor: '#e2e8f0',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Сменить статус
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteStudentFromServer(student.id))}
                                        style={{
                                            padding: '6px 10px',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!isLoading && !error && filteredStudents.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                    Ученики не найдены
                </div>
            )}
        </div>
    )
}

export default StudentsList;