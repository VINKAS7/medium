function Blog_Card({username,title,content,date_time}: {username:string, title:string,content:string,date_time:null | string}) {
    return(
        <div className={"pl-40 pr-40 pt-5 pb-10"}>
            <div className={"grid grid-cols-2 border-b-2 hover:cursor-pointer"}>
                <div className={"flex flex-col"}>
                    <div className={"pt-1 pb-1"}><span className={"font-bold pr-2"}>{username}</span><span>{date_time}</span></div>
                    <div className={"text-2xl font-bold pb-1"}>{title}</div>
                    <div className={"text-lg pb-4"}>{content.slice(0,100)+"..."}</div>
                    <div className={"pb-2"}>{`${Math.ceil(content.length/100)} minutes`}</div>
                </div>
                <div className={"float-end p-4"}><img src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AOOggO1oyMtCTD6Ep2MdhgAAAA%26pid%3DApi&f=1&ipt=04ef7df11dea07356ab43b90aa39dedd9b06e761e63b7eb1f1bf7cff34146c43&ipo=images"} width={"200"} className={"float-end rounded hidden lg:block"}/></div>
            </div>
        </div>
    )
}
export default Blog_Card;