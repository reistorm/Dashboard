import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAppSelector } from "../hooks/redux";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const StudentsChart = () => {
    const students = useAppSelector((state) => state.students.list);

    const ieltsCount = students.filter(s => s.targetExam === 'IELTS').length;
    const toeflCount = students.filter(s => s.targetExam === 'TOEFL').length;
    const jlptCount = students.filter(s => s.targetExam === 'JLPT N4').length;

    const data = [
        { name: 'IELTS', value: ieltsCount },
        { name: 'TOEFL', value: toeflCount },
        { name: 'JLPT N4', value: jlptCount },
    ]

    if (students.length === 0) {
        return <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>Нет данных для статистики</div>;
    }

    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
            height: '350px'
        }}>
            <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Популярность экзаменов</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StudentsChart;

