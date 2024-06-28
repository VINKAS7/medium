import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal_Loader from "../components/Modal_Loader.tsx";
import AppBar from "../components/AppBar.tsx";
type username_type = {
    username:string
}
type BlogData_type = {
    title:string,
    id:number,
    date_time:string
    content:string,
    author:username_type
}
function Blog(){
    const location = useLocation()
    const [BlogData,setBlogData] = useState<BlogData_type>({author: {username: ""}, id: 0 ,content: "", date_time: "", title: ""})
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true);
        const fetch_blog = async () => {
            const response = await fetch("https://backend.vinayakkashyap753.workers.dev/api/v1/blog/"+location.state.id,{
                method: "GET",
                headers:{
                    "Authorization": `${localStorage.getItem("medium_token")}`
                }
            });
            return await response.json();
        }
        fetch_blog().then((r) => {
            setBlogData(r.blog);
            setLoading(false);
        })
    },[])
    return(
        <>
            <Modal_Loader active={loading}/>
            <AppBar />
            <div className={"grid grid-cols-12 p-20"}>
                <div className={"flex justify-center flex-col col-span-9"}>
                    <div className={"text-4xl font-bold"}>{BlogData.title}</div>
                    <div className={"text-lg pt-2 pb-2"}>Posted on {new Date(BlogData.date_time).toDateString()}</div>
                    <div className={"text-md"}>{BlogData.content}</div>
                </div>
                <div className={"col-span-3"}>
                    <div className={"text-xl font-bold"}>Author</div>
                    <div className={"pl-5 text-lg"}>{BlogData.author.username}</div>
                </div>
            </div>
        </>
    )
}
export default Blog;