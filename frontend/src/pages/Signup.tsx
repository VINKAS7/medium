import Quote from "../components/Quote.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal_Loader from "../components/Modal_Loader.tsx";
function Signup(){
    const navigate = useNavigate();
    const [fetched, setFetched] = useState<boolean>(false);
    async function signup_send_data(){
        setFetched(true);
        const response = await fetch("https://backend.vinayakkashyap753.workers.dev/api/v1/user/signup",{
            method: "POST",
            body: JSON.stringify({
                // @ts-ignore
                username: document.getElementById("username").value,
                // @ts-ignore
                email: document.getElementById("email").value,
                // @ts-ignore
                password: document.getElementById("password").value
            })
        });
        const ans = await response.json();
        if(ans.message === 'Yes'){
            localStorage.setItem("medium_token",ans.token);
            navigate("/login");
        }
        else{
            alert(ans.message);
            setFetched(false);
            navigate("/signup")
        }
    }
    return(
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            <Modal_Loader active={fetched}/>
            <div>
                <div className={"h-screen flex justify-center items-center flex-col p-40"}>
                    <div className={"p-2 font-bold text-4xl"}>
                        Create an Account
                    </div>
                    <div className={"text-slate-400"}>
                        Already have an account? <span><a href={"/login"} className={"underline"}>Login</a></span>
                    </div>
                    <div className={"w-[100%] pl-20 pr-20 font-bold p-2 text-lg"}>
                        Username
                    </div>
                    <div className={"w-[100%] pl-20 pr-20"}>
                        <input type={"text"} className={"border-2 w-[100%] rounded p-2"} id={"username"} placeholder={"Enter your username"}/>
                    </div>
                    <div className={"w-[100%] pl-20 pr-20 font-bold p-2 text-lg"}>
                        Email
                    </div>
                    <div className={"w-[100%] pl-20 pr-20"}>
                        <input type={"email"} className={"border-2 w-[100%] rounded p-2"} id={"email"} placeholder={"m@example.com"}/>
                    </div>
                    <div className={"w-[100%] pl-20 pr-20 font-bold p-2 text-lg"}>
                        Password
                    </div>
                    <div className={"w-[100%] pl-20 pr-20"}>
                        <input type={"password"} className={"border-2 w-[100%] rounded p-2"} id={"password"}/>
                    </div>
                    <div className={"w-[100%] pl-20 pr-20 p-4"}>
                        <button className={"bg-black text-white w-[100%] rounded p-2 font-bold"} onClick={signup_send_data}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div className={"hidden lg:block"}>
                    <Quote />
            </div>
        </div>
    )
}
export default Signup;