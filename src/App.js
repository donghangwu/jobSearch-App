import React ,{useState} from 'react';
import FetchJobs from './fetchJobs'
import {Container} from 'react-bootstrap'
import Job from './Job'
import Paginations from './Paginations';
import Filters from './Filters';
function App() {
  const [params,setParams] = useState({'description':'','location':''});
  const [page, setPage] = useState(1)
  const {jobs,loading,err,nextPage} = FetchJobs(params,page);

  {/** passed to filter function to update the filters */}
  function handleFilters(e)
  {
    e.preventDefault();
    const filter=e.target.name;
    const value= e.target.value;
    setPage(1);
    setParams(prev=>{
      return{...prev,[filter]:value}
    })
  }


  return (
    <Container className='container'>
      <h1>GitHub Jobs</h1>
      <br></br>
      <Filters filters={params} changeFilters={handleFilters}></Filters>
      <Paginations page={page}setPage={setPage} nextPage={nextPage}/>
      {loading &&<h1>loading...</h1>}      
      {err&&<h1>ERROR! Please Refresh the page</h1>}
      <h2>{jobs.map(job=>{
        return<Job key={job.id} job ={job}/>
      })}</h2>

    </Container>
  );
}

export default App;
