import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Landing, Error,ProtectedRoute } from './pages';
import { AllPosts, Profile, SharedLayout, AllMyPosts, AddPost } from './pages/dashboard';


function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>}>
          <Route path="/AllMyPosts" element={<AllMyPosts />} />
          <Route index element={<AllPosts />}></Route>
          <Route path='add-post' element={<AddPost />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>



  );
}

export default App;
