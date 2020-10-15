import React, { useState } from 'react';
import LandingCard from '../components/LandingCard';
import CapsuleCard from '../components/CapsuleCard';
import Button from '@material-ui/core/Button';
import BackendService from '../backendServices';
import './Home.css';
import { ReactComponent as Rocket } from '../../assets/rocket.svg';

function Home() {
    const [flag, setflag] = useState(0);
    const [input, setInput] = useState('');
    const [data, setdata] = useState({});

    const getCapsules = async (e) => {
        e.preventDefault();
        let details = await BackendService.getCapsules();
        setdata(details.data.data);
        setflag(1);
    };

    const editor = async (e) => {
        // e.preventDefault();
        let charlen = e.target.value.length;
        if (charlen > 15) {
            alert('Id cannot be more than 15 char.')
        } else {
            setInput(e.target.value);
        }
    };

    const getLandingPad = async (e) => {
        e.preventDefault();
        try {
            if (input != "") {
                let details = await BackendService.getLandingPadDetails(input);
                setflag(2);
                setdata(details.data.data);
                setInput('');
            }
            else {
                alert("Id can't be empty.");
            }
        }
        catch (err) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className="home">

            <div className="home__displayConsole">
                {flag === 0 && <p>Please click a button!</p>}
                {flag === 1 && data.map(obj => <CapsuleCard key ={obj.capsule_id} capsule={obj} />)}
                {flag === 2 && <LandingCard data={data} />}
            </div>

            <div className="home__controlConsole">
                <Button onClick={getCapsules} variant="contained" color="primary">
                    Capsules
             </Button>
                <Rocket />
                <div className="controlConsole__option">
                    <input
                        value={input}
                        onChange={editor}
                        className="controlConsole__InputField"
                        placeholder="LZ-1"
                        type="text"
                    ></input>
                    <Button onClick={getLandingPad} variant="contained" color="primary">
                        Landing Pad
             </Button>
                </div>
            </div>

        </div>
    )
}

export default Home
