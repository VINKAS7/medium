import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Blog from "./pages/Blog.tsx";
import Home from "./pages/Home.tsx";
import Write_Blog from "./pages/Write_Blog.tsx";
import My_Blogs from "./pages/My_Blogs.tsx";
import Edit_Blog from "./pages/Edit_Blog.tsx";
function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/home"} element={<Home/>} />
                    <Route path={"/write_blog"} element={<Write_Blog/>} />
                    <Route path={"/My_blogs"} element={<My_Blogs/>} />
                    <Route path={"/edit_blog"} element={<Edit_Blog/>} />
                    <Route path={"/blog/:id"} element={<Blog />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;