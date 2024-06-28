import AppBar from "../components/AppBar.tsx";
import {useEffect, useState} from "react";
import Modal_Loader from "../components/Modal_Loader.tsx";
import {useNavigate} from "react-router-dom";

type b = {
    title:string,
    content:string,
    date_time:string,
    id:number,
    author:{
        username:string
    }
}
function My_Blogs() {
    const navigate = useNavigate();
    const [my_blogs, setMy_blogs] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetch_my_blogs = async () => {
            setLoading(true);
            const response = await fetch("https://backend.vinayakkashyap753.workers.dev/api/v1/blog/my_blogs",{
                headers:{
                    "Authorization": `${localStorage.getItem("medium_token")}`
                }
            });
            return await response.json();
        }
        fetch_my_blogs().then((r) => {
            setMy_blogs(r.id_blogs);
            setLoading(false);
        })
    },[])
    return(
        <>
            <Modal_Loader active={loading} />
            <AppBar />
            {my_blogs.map((blog:b) => {
                return (
                    <div className={"flex justify-between items-center pl-40 pr-40 pt-10 pb-10 border-b-2 "} key={blog.id}>
                        <div className={"text-xl font-bold"}>{blog.title}</div>
                        <div className={"flex items-center"}>
                            <div>
                                <button className={"bg-green-500 rounded-lg p-2 mr-5"} onClick={async () => {
                                    navigate("/edit_blog",{state:{title:blog.title,content:blog.content,id:blog.id}});
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <button className={"bg-red-500 rounded-lg p-2"} onClick={async () => {
                                    const response = await fetch("https://backend.vinayakkashyap753.workers.dev/api/v1/blog/"+blog.id,{
                                        method:"DELETE",
                                        headers:{
                                            "Authorization": `${localStorage.getItem("medium_token")}`
                                        }
                                    })
                                    const ans = await response.json();
                                    alert(ans.message)
                                    navigate("/home")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default My_Blogs;