import { useState } from 'react';
import './AddTask.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';

const AddTask = () => {
    const navigate = useNavigate()
    const [task, setTask] = useState({
        heading: '',
        description: '',
        priority: 'low',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setTask({
            ...task,
            image,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('heading', task.heading);
        formData.append('description', task.description);
        formData.append('priority', task.priority);
        formData.append('image', task.image);
        console.log(formData);
        const response = await axios.post("http://localhost:3000/add", formData);
        console.log(response);
        navigate('/')
    };

    return (
        <>
            <Navbar />
            <div className='card w-50 m-auto mt-5 border border-5'>
                <h3 className='m-5 mb-0 text-center'><b>Add New Task...!</b></h3>
                <form action="" className='p-5'>
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="heading">Heading</label>
                        <input type="text" className='form-control' name="heading" onChange={handleChange} required />
                    </div>
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="description">Description</label>
                        <input type="text" className='form-control' name="description" onChange={handleChange} required />
                    </div>
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="priority">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            className='form-control'
                            value={task.priority}
                            onChange={handleChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="image">Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange}className='form-control' />
                    </div>
                    <div className="text-center">
                        <button type='reset' className='btn btn-danger px-5 mt-3 me-1'> Cancel</button>
                        <button type='submit' className='btn btn-success px-5 mt-3 ms-1' onClick={handleSubmit}> Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddTask;
