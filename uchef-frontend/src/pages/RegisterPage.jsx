// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../api/apiClient';

// const RegisterPage = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('');
//     const [error, setError] = useState('');
    
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             await apiClient.post('/users/register/', { username, email, password, role });
//             navigate('/login'); // Redirect to login page after successful registration
//         } catch (err) {
//             setError('Registration failed. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleRegister}>
//                 <div>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>


//                 <div>
//                     <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
//                         <option value="user" >User</option>
//                         <option value="restaurant">Restaurant</option>
//                         {/* <option value="admin">Admin</option> */}
//                     </select>
//                 </div> 

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterPage;

import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Default role
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/users/register/', formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="restaurant">Restaurant</option>
                {/* <option value="admin">Admin</option> */}
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterPage;