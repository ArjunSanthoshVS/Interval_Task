import './Tasks.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';

const Tasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState('all'); // Initial filter is 'all'

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/tasks");
            const sortedTasks = response?.data.sort((a, b) => (a.time > b.time ? -1 : 1));
            const tasksWithIndex = sortedTasks.map((task, index) => ({
                ...task,
                index: index + 1,
            }));
            setTasks(tasksWithIndex);
        };
        fetchData();
    }, []);

    const handlePriorityChange = (priority) => {
        setSelectedPriority(priority);
    };

    const filteredTasks = selectedPriority === 'all' ? tasks : tasks.filter(task => task.priority === selectedPriority);

    return (
        <>
            <Navbar/>
            <div className='d-flex justify-content-between mx-5 mt-4'>
                <button className='btn btn-primary mb-5 px-5 mt-4' onClick={() => navigate('/add')}>Add New Task</button>
                <div className='w-50'>
                    <label>Filter by Priority: </label>
                    <select onChange={(e) => handlePriorityChange(e.target.value)} value={selectedPriority} className='form-control'>
                        <option value="all">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            
            {filteredTasks.length > 0 ? (
                <Table bordered border={"2"} hover size="sm" className='w-75 m-auto'>
                    <thead>
                        <tr>
                            <th id='header'>ID</th>
                            <th id='header'>Heading</th>
                            <th id='header'>DESCRIPTION</th>
                            <th id='header'>PRIORITY</th>
                            <th id='header'>DATE</th>
                            <th id='header'>TIME</th>
                            <th id='header'>IMAGE</th>
                            <th id='header'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((item) => (
                            <tr key={item._id}>
                                <td id='text-fields'>{item.index}</td>
                                <td id='text-fields'>{item?.heading}</td>
                                <td id='text-fields'>{item?.description}</td>
                                <td id='text-fields'>{item?.priority}</td>
                                <td id='text-fields'>{item?.date}</td>
                                <td id='text-fields'>{item?.time}</td>
                                <td id='text-fields'>
                                    {item.image ? (
                                        <img className='list-img'
                                            src={`data:image/jpeg;base64,${Uint8Array.from(item.image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')}`}
                                            alt="Task"
                                        />
                                    ) : (
                                        "Image not found"
                                    )}
                                </td>
                                <td id='text-fields'><button onClick={() => navigate('/task', { state: { item } })} className='btn btn-primary my-auto'>Click Here</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                    <h2 className='text-center m-5 text-danger'><b>No items with the selected priority...!</b></h2>
            )}
        </>
    );
};

export default Tasks;
