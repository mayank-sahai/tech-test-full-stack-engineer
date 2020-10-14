import React, { useState } from 'react';
import LandingCard from '../components/LandingCard';
import CapsuleCardList from '../components/CapsuleCardList';
import Button from '@material-ui/core/Button';
import { ReactComponent as Rocket } from '../../assets/rocket.svg';

function Home() {
    const [flag, setflag] = useState(0);
    const [input, setInput] = useState('');
    return (
        <div className="home">

            <div className="home__displayConsole">
                {flag == 1 && <CapsuleCardList />}
                {flag == 2 && <LandingCard />}
            </div>

            <div className="home__controlConsole">
                {/* <div className="controlConsole__option"> */}
                <Button variant="contained" color="primary">
                    Capsules
             </Button>
                {/* </div> */}
                {/* <div className="controlConsole__option"> */}
                <Rocket />
                {/* </div> */}
                <div className="controlConsole__option">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="controlConsole__InputField"
                        placeholder="ksc_lc_39a"
                        type="text"
                    ></input>
                    <Button variant="contained" color="primary">
                        Landing Pad
             </Button>
                </div>
            </div>

        </div>
    )
}

export default Home
