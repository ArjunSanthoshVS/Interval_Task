import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";

const Edit = () => {

    const location = useLocation();
    const item = location.state.item;
    const navigate = useNavigate();

    const [task, setTask] = useState({
        _id: item._id,
        heading: item.heading,
        description: item.description,
        priority: item.priority,
        date: item.date,
        time: item.time,
        image: item.image, // You may need to convert this to a form-friendly format
    });

    console.log(task.image);
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    // const handleImageChange = (e) => {
    //     const imageFile = e.target.files[0];
    //     console.log(imageFile);
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //         const fileBuffer = new Buffer(new Uint8Array(event.target.result));
    //         const convertedImage = {
    //             data: fileBuffer,
    //             type: "Buffer",
    //         };
    //         setTask({
    //             ...task,
    //             image: convertedImage,
    //         });
    //     };
    //     reader.readAsArrayBuffer(imageFile);
    // };
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
        formData.append('_id', task._id);
        formData.append('heading', task.heading);
        formData.append('description', task.description);
        formData.append('priority', task.priority);
        formData.append('date', task.date);
        formData.append('time', task.time);
        formData.append('image', task.image);
        const response = await axios.put("http://localhost:3000/edit", formData);
        console.log(response);
        navigate('/')
    };

    return (
        <div>
            <Navbar />
            <div className="card w-50 m-auto mt-5 border border-5">
                <h3 className='m-5 mb-0 text-center'><b>Edit Task...!</b></h3>
                <form onSubmit={handleSubmit} className='p-5'>
                    <input type="hidden" name="_id" value={task._id} />
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="heading">Heading</label>
                        <input
                            type="text"
                            className="form-control"
                            name="heading"
                            value={task.heading}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={task.description}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="priority">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            className="form-control"
                            value={task.priority}
                            onChange={handleFieldChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="mb-4 w-75 m-auto">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-control"
                        />
                    </div>
                    <div className="text-center">
                        <button type='submit' className='btn btn-success px-5 mt-3 ms-1'> Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
