import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../hooks/redux";
import { addNewStudent } from "../store/studentsSlice";

interface IFormInput {
    name: string;
    language: string;
    targetExam: string;
    currentTopic: string;
}

const AddStudentForm = () => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        defaultValues: {
            language: 'English',
            targerExam: 'IELTS'
        }
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const newStudent = {
            id: Date.now().toString(),
            name: data.name,
            language: data.language,
            targetExam: data.targetExam,
            currentTopic: data.currentTopic,
            status: 'active' as const,
        };
        dispatch(addNewStudent(newStudent));
        reset();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
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

            <div>
                <input
                    type="text"
                    placeholder="ФИО студента"
                    {...register('name', {
                        required: 'Пожалуйста, введите имя',
                        minLength: { value: 2, message: 'Минимум 2 буквы' },
                        pattern: {
                            value: /%[А-Яа-яЁё\s-]+$/,
                            message: 'ФИО может содержать только русские буквы'
                        }
                    })}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.name.message}</span>}
            </div>

            <select
                {...register('language')}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                <option value="English">Английский</option>
                <option value="Japanese">Японский</option>
            </select>


            <select
                {...register('targetExam')}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="JLPT N4">JLPT N4</option>
            </select>

            <div>
                <input
                    type="text"
                    placeholder="Текущая тема"
                    {...register('currentTopic', {
                        required: 'Укажите тему',
                        minLength: { value: 5, message: 'Тема должна содержать минимум 5 символа' },
                        pattern: {
                            value: /^[А-Яа-яЁёA-Za-z0-9\s.,-]+$/,
                            message: 'Удалите некорректные спецсимволы'
                        }
                    })}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {errors.currentTopic && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.currentTopic.message}</span>}
            </div>

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