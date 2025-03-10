
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { Layout } from './components/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import AuthComponent from './auth/auth';
import { FilesList } from './components/FilesList/FilesList';
import { DocumentPage } from './pages/Documents/DocumentPage/DocumentPage';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Layout />}>
      <Route path="/"  element={<Navigate to="/Home" />}/>
      <Route path="Home" element={<HomePage />} />
      <Route path="Rating" element={<HomePage />} />
      <Route path='Auth' element={<AuthComponent/>}/>
      <Route path='Admin'>
        <Route path='Documents' element={<FilesList/>}/>
        <Route path='Document/:id' element={<DocumentPage/> }/>
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;