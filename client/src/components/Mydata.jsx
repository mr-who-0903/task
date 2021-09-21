import React, {useState} from 'react'


const Mydata = () => {

    const [alldata, setAlldata] = useState([]);

    const callData = async() =>{
        try{
            const res = await fetch('/getAllData', {
                method:"GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setAlldata(data);

            if(res.status !== 200){
                throw new Error(res.error);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    callData();

    return (
        <div>
             <div className="files-container">
                <table className="files-table">
                    <thead>
                    <tr>
                        <th>User Id</th>
                        <th>id</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                    </thead>
                    <tbody>
                    {alldata.length > 0 ? (
                        alldata.map(
                        ({ userID, id, title, body, _id }) => (
                            <tr key={_id}>
                            <td>{userID}</td>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{body}</td>
                            </tr>
                        )
                        )
                    ) : (
                        <tr>
                        <td colSpan={3} style={{ fontWeight: '300' }}>
                            No files found. Please add some.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default Mydata
