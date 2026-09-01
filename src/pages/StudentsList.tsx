import { useState } from "react";
import { useAppSelector } from "../hooks/redux";

const StudentsList = () => {
    const students = useAppSelector((state) => state.students.list);
    const [searchQuery, setSearchQuery] = useState('');

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
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredStudents.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                    Ученики не найдены
                </div>
            )}
        </div>
    )
}

export default StudentsList;