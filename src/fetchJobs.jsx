import {useReducer,useEffect} from 'react'
import axios from 'axios'
const ACTIONS ={
    MAKE_REQUEST: 'make-request',
    GET_DATA:'get-data',
    ERROR:'error',
    NEXT_PAGE:'next-page'


}

//called everytime we called dispatch
function reducer(state,action)
{
    switch(action.type)
    {
        case ACTIONS.MAKE_REQUEST:
                return {loading:true,jobs:[]};
        
        case ACTIONS.GET_DATA:
            return{...state,loading:false,jobs:action.payload.jobs};

        case ACTIONS.ERROR:
            return{...state,loading:false,error:action.payload.error,jobs:[]};
        case ACTIONS.NEXT_PAGE:
            return{...state,nextPage:action.payload.nextPage}

        default:
            return state;

        
    }
}


//get around the CORS issue
const BASE_URL='https://david-cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
export function FetchJobs(params,page)
{
    const [state, dispatch] = useReducer(reducer,{jobs:[],loading:true});


    useEffect(()=>{
        const cancelTokenGetData = axios.CancelToken.source();
        const cancelTokenCheckNext = axios.CancelToken.source();
        //display loading screen, doing nothing else
        dispatch({type: ACTIONS.MAKE_REQUEST})
        
        //getting data from github api
        axios.get(BASE_URL,{
            cancelToken:cancelTokenGetData.token,
            params:{markdown:true,page:page,...params}
        }).then(res=>
            {
                //We got the data and now save it to the state
                dispatch({type:ACTIONS.GET_DATA,payload:{jobs:res.data}})
            }).catch(e=>{
                //cancel request will generate an error
                //this is not error because we purposly canceled the request
                //due to the user is typing
                if(axios.isCancel(e))return;
                dispatch({type:ACTIONS.ERROR,payload:{error:e}})
            })


            //getting data from github api again
            //this time we are not storing those data
            //just to see if there is more pages after 
            axios.get(BASE_URL,{
                cancelToken:cancelTokenCheckNext.token,
                params:{markdown:true,page:page+1,...params}
            }).then(res=>
                {
                    //not storing the data only update the nextPage to true if there is more data
                    dispatch({type:ACTIONS.NEXT_PAGE,payload:{nextPage:res.data.length!==0}})
                }).catch(e=>{
                    //this is not error because we purposly canceled the request
                    //due to the user is typing
                    if(axios.isCancel(e))return;
                    dispatch({type:ACTIONS.ERROR,payload:{error:e}})
                })



            //request will be cancel if the user clicked the next page
            return()=>{
                cancelTokenGetData.cancel();
                cancelTokenCheckNext.cancel();
            }

    },[params,page]);
    //state is containing {jobs: loading:}

  
    return state
}
export default FetchJobs;