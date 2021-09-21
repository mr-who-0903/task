import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './About.css'
import Mydata from './Mydata';
import dataFile from '../data.json';

const About = () => {

    const postData = async (e) =>{
        e.preventDefault();
    
        const res = await fetch("/postData", {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.parse(dataFile)
        });

        const data = await res.json();

        if(res.status === 422 || !data){
            console.log("error");
        }
        else if(res.status === 201){
            
            console.log("data sent")

            
        }
    }

    return (
        <div className="dashboard">
          <Tabs>
            <TabList>
            <Tab>Upload</Tab>
            <Tab>Data</Tab>
            </TabList>

            <TabPanel>
                <input type="file" id="myfile" onClick={postData}/>
            </TabPanel>
            <TabPanel>
                <Mydata/>
            </TabPanel>
        </Tabs>
        </div>
    )
}

export default About;
