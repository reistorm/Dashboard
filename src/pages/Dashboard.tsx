import { useAppSelector } from "../hooks/redux";
import AddStudentForm from "../components/AddStudentForm";
import StudentsChart from '../components/StudentsChart'

const Dashboard = () => {
    const students = useAppSelector((state) => state.students.list)
    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>Обзорная панель (Dashboard)</h1>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '30px' }}
            >
                <AddStudentForm />
                <StudentsChart />
            </div>

            <h2 style={{ marginBottom: '15px' }}>Последние ученики</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {students.map((student) => (
                    <div
                        key={student.id}
                        style={{
                            padding: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '300px'
                        }}
                    >
                        <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>
                            {student.name}
                        </h3>
                        <p style={{ margin: '5px', fontSize: '14px' }}>
                            <strong>Язык:</strong> {student.language}
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Цель:</strong> {student.targetExam}
                        </p>

                        <p style={{ margin: '5px 0', fontSize: '14px' }}>
                            <strong>Текущая тема:</strong> {student.currentTopic}
                        </p>
                        <span style={{
                            display: 'inline-block',
                            marginTop: '15px',
                            padding: '4px 8px',
                            backgroundColor: student.status === 'active' ? '#dcfce3' : '#fee2e2',
                            color: student.status === 'active' ? '#166534' : '#991b1b',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            {student.status === 'active' ? 'Активен' : 'Пауза'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;