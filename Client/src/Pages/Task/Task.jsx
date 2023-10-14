import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const Task = () => {
    const location = useLocation();
    const item = location.state.item;
    console.log(item);
    const navigate = useNavigate()
    const handleDelete = async (itemId) => {
        await axios.delete(`http://localhost:3000/delete?_id=${itemId}`)
        navigate('/')
    }
    return (
        <>
            <Navbar/>
            <div className="card border border-5 p-3 w-50 m-auto mt-5 d-flex align-items-center">
                <div className="img text-center">
                    <img className='w-50' src={`data:image/jpeg;base64,${Uint8Array.from(item.image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')}`}
                        alt="Task" />
                </div>
                <div className="details">
                    <h3>Heading : {item.heading}</h3>
                    <h4>Description : {item.description}</h4>
                    <h4>Priority : <span className='text-success'>{item.priority}</span></h4>
                    <h6>Date : {item.date}</h6>
                    <h6>Time : {item.time}</h6>
                </div>
                <button className='btn btn-primary px-5 m-2' onClick={() => navigate('/edit', { state: { item } })}>Edit</button>
                <button className='btn btn-danger px-5 m-2' onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
        </>
    )
}

export default Task
