import React, { useContext ,useState} from 'react';
import './EnrollmentCard.css';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import ProgressBar from 'react-percent-bar';
//import ReactPlayer from 'react-player'
import ReactPlayer from 'react-player/youtube'
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';
import { Button } from '@material-ui/core';

function EnrollmentCard(props) {
    const history = useHistory();
    const [displayVideo, setDisplayVideo] = useState(false);
    const { setSelectedProductfn } = useContext(AppContext)
    const { user } = useContext(AppContext);
    const { setUser } = useContext(AppContext);
    const onProductSelect = (item) => {
        setSelectedProductfn(item);
        const userLs = localStorage.getItem('user');
        if(userLs){
            setUser(JSON.stringify(userLs));
        }
        history.push('productDetails');
    }


    return (
        <>
        {displayVideo?<div id="overlay" >
          <Button onClick={e => setDisplayVideo(false)} variant="contained" color="default" startIcon={<CancelPresentationTwoToneIcon/>}></Button>  
          <ReactPlayer className='react-player' playing={true} height='90%' width="90%"  url={props.data.src} />
       </div>:null}
        <div className="card-container" onClick={e => setDisplayVideo(true)}>
            <img className="card-img" src={props.data.img}></img>
            <span className="card-name" >{props.data.name}</span>
            <ProgressBar borderColor="black"  height="10px" colorShift={true} fillColor="blue" percent={ Math.floor(Math.random() * 10) } />
        </div>
        </>
    );
}

export default EnrollmentCard;
