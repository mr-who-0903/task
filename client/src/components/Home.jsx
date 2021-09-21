import React, {useState, useEffect} from 'react'

const Home = () => {

    const [username, setUsername] = useState("");
    const [flag, setFlag] = useState(false);

    const callHomePage = async () => {
        try{
            const res = await fetch('/getdata', {
                method:"GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            setUsername(data.name);
            setFlag(true);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callHomePage();
    }, [])



    return (
        <>
        <div className="home-page"> 
            <div className="home-div">
                <p className="pt-5">WELCOME</p>
                <h1>{ username }</h1>
                <h2> { flag ? 'Happy to see you back' : 'We Are The MERN Developers'}</h2>
            </div>
        </div>
        </>
    )
}

export default Home
