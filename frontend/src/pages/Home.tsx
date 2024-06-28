import {useEffect, useState} from "react";
import Blog_Card from "../components/Blog_Card.tsx";
import Modal_Loader from "../components/Modal_Loader.tsx";
import AppBar from "../components/AppBar.tsx";
import {useNavigate} from "react-router-dom";
type blogs = [{
    id:number,
    title:string,
    content:string,
    date_time:string
    authorId:number,
    author: {
        username:string
    }
}]
function Home(){
    const [blogs,setBlogs] = useState<blogs>([{
        id:0,
        content:"",
        date_time:"",
        authorId:0,
        title:"",
        author:{
            username:""
        }
    }]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const fetch_blogs = async () => {
            setLoading(true);
            const response = await fetch("https://backend.vinayakkashyap753.workers.dev/api/v1/blog/bulk",{
                headers:{
                    "Authorization": `${localStorage.getItem("medium_token")}`
                }
            });
            return await response.json();
        }
        fetch_blogs().then(response => {
            setBlogs(response.blogs)
            setLoading(false);
        });
    },[])
    return(
        <>
            <Modal_Loader active={loading}/>
            <AppBar/>
            {blogs.map((blog) => {
                return(
                    //@ts-ignore
                    <div key={blog.id} onClick={() => {
                        //@ts-ignore
                        navigate("/blog/"+blog.id,{state:{id:blog.id}});
                    }}>
                        <Blog_Card title={blog.title} content={blog.content} username={blog.author.username} date_time={new Date(blog.date_time).toDateString()}/>
                    </div>
                )
            })}
        </>
    )
}
export default Home;