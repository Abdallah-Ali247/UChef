import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/authSlice';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantListPage from './pages/RestaurantListPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';

// const PrivateRoute = ({ children }) => {
//     const auth = useSelector((state) => state.auth);
//     return auth.token ? children : <Navigate to="/login" />;
// };

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  // if (auth.isLoading) {
  //     return <p>Loading...</p>; // Show a loading message while checking auth
  // }
  return auth.token ? children : <Navigate to="/login" />;
};

function App() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        window.location.href = '/login';
    };

    return (
        <Router>
            <div>
                <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <h2>Meal Ordering Platform</h2>
                    {auth.token && (
                        <button onClick={handleLogout} style={{ marginLeft: '20px' }}>
                            Logout
                        </button>
                    )}
                </nav>

                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/restaurants"
                        element={
                            <PrivateRoute>
                                <RestaurantListPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/restaurants/:id"
                        element={
                            <PrivateRoute>
                                <MenuPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute>
                                <CartPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;