import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Contacts = () => {

    const [userdata, setUserData] = useState({
        name:"", email:"", ph:"", msg:""
    });

    const callContactPage = async () => {
        try{
            const res = await fetch('/getdata', {
                method:"GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userdata, name:data.name, email:data.email, ph:data.ph});

            if(res.status !== 200){
                throw new Error(res.error);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callContactPage();
    }, [])

    const onChangeFunc = (event) => {
        const {name, value} = event.target;
        setUserData({ ...userdata, [name]:value});
    }

    const onClickFunc = async (e) => {
        try{
        e.preventDefault();
 
        const {name, email, ph, msg} = userdata;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, email, ph, msg
            }) 
        });
        const data = await res.json();
        if(!data){
            toast.error("Message not sent!", 
                {position: "top-center",
                autoClose: 5000});
        }
        else{
            toast.success(data.message, 
                {position: "top-center",
                autoClose: 5000});
            setUserData({...userdata, msg:""});
        }}
        catch(err){ 
            toast.error("Message not sent!", 
                {position: "top-center",
                autoClose: 5000});
            console.log(err);    
        }
        }

    return (
        <>
            <div className="container contact">
                <div className="row">
                <div className="col-lg-10 contact-row offset-lg-1">

                    <div className="contact-box">
                        <div><i className="fa fa-phone"></i></div>
                        <div className="contact-text"> 
                            <div style={{fontWeight:'bold'}}>Phone</div> 
                            +91 9291028263 
                        </div> 
                    </div>
                    <div className="contact-box">
                        <div><i className="fa fa-paper-plane"></i></div>
                        <div className="contact-text"> 
                            <div style={{fontWeight:'bold'}}>Email</div> 
                            amara@gmail.com
                        </div>  
                    </div>
                    <div className="contact-box">
                        <div><i className="fa fa-map-marker"></i></div>
                        <div className="contact-text">
                             <div style={{fontWeight:'bold'}}>Address</div>
                             12/A, Kunj Vihar, Delhi 
                        </div> 
                    </div>
                </div>

                <div className="col-lg-10 content offset-lg-1">
                    <h3 className="form-heading mb-3">Get in Touch</h3>
                        <div className="getInTouch-form">
                        
                        <div className="d-flex justify-content-between">
                            <div className="form-group">
                                <input type="text" autoComplete="off" className="form-control" name="name"
                                onChange={onChangeFunc} value={userdata.name} name="name" placeholder="Your Name"/>
                            </div>
                             
                            <div className="form-group">
                                <input type="text" autoComplete="off" className="form-control" name="email"
                                onChange={onChangeFunc} value={userdata.email} placeholder="Your Email"/>
                            </div>

                            <div className="form-group">
                                <input type="text" autoComplete="off" className="form-control" name="ph" 
                                onChange={onChangeFunc} value={userdata.ph} placeholder="Your Phone number"/>
                            </div>
                        </div> 
                        
                        <div className="msg-group" style={{marginBottom:"2rem"}}>
                                <textarea autoComplete="off" type="text" rows="4" className="form-control" 
                                onChange={onChangeFunc} value={userdata.msg} name="msg" placeholder="Message"/>
                        </div>

                        <div className="form-group-btn">
                            <button type="submit" name="getInTouch" onClick={onClickFunc}
                            className="btn btn-primary btn-block btn-lg">Send</button>
                        </div>

                    </div>    
                </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Contacts
