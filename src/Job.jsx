import React from 'react'
import {useReducer,useState} from 'react'
import{Card,Badge, Button} from 'react-bootstrap'
import './style.css'
import ReactMarkdown from 'react-markdown'



export default function Job({job}) {

    const [btn, setBtn] = useState(false);

     
    function exchange()
    {
        setBtn(prevBtn=>!prevBtn);
    }
    function showDescript(btn)
    {
        if(btn)
        {
            return (
            <>
            <Button onClick={exchange}>
                Hide Requirement</Button>
                <div className='job_description'>
                    <ReactMarkdown source={job.description}/>
                </div>
                
               </> 
           );
        }
        else
        return(
            <Card.Text onClick={exchange}>
            <Button>View Requirement</Button>
            </Card.Text>)
    };

    return (
        <Card className='card'> 
            <Card.Body>
                {/**Company Sumary */}
                <div className='d-flex justify-content-between'>
                    {/**left side display company info */}
                    <div>
                        <Card.Title>
                            {job.title}- <span className='font-weight-light'>{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle>
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <h5><Badge className='small' variant='info' className='m-2'>
                            {job.type}</Badge>
                            <Badge>{job.location}</Badge>
                            </h5>
                            <div style={{wordBreak:'break-all'}}>
                                <h5 className='apply'>Apply By:</h5>
                               <h6><ReactMarkdown source={job.how_to_apply}/></h6> 
                            </div>                       
                    </div>
                    {/**right side display company logo */}
                    <img height='50' alt='Company Logo' src={job.company_logo}/>
                </div>
                {/**view Detail Button */}
                {showDescript(btn)}
                
            </Card.Body>
        </Card>
    )
}
