import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HomePage } from './components/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import AuthComponent from './pages/auth/auth';
import { FilesList } from './components/FilesList/FilesList';
import { DocumentPage } from './pages/Documents/DocumentPage/DocumentPage';
import { Profile } from './pages/Profile/Profile';
import { getMe } from './api/api-utils';
import { setUser } from './store/userSlice';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { RatingPage } from './pages/Ratings/RatingPage/RatingPage';
import { ReportComp } from './pages/ReportComp/ReportComp';
import PdfGenerator from './components/PdfGenerator/PdfGenerator';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await getMe(token);
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/Home" />} />
          <Route path="Home" element={<HomePage />} />
          <Route path='PDF' element={<PdfGenerator/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="Admin" />
          </Route>
          <Route path="Auth" element={<AuthComponent />} />
          <Route path="Profile/:username" element={<Profile />} >
            <Route path="Docs" element={<Profile />} />
            <Route path="Doc/:id" element={<Profile />} />
          </Route>
          <Route path="Rating" element={<RatingPage />} >
            <Route element={<PrivateRoute />}>
              <Route path="Docs" element={<FilesList />} />
              <Route path="Doc/:id" element={<DocumentPage />} />
              <Route path="Report" element={<ReportComp />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;