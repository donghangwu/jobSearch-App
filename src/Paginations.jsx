import React from 'react'
import{Pagination} from 'react-bootstrap'
export default function Paginations({nextPage,page,setPage}) {

    function changePage(type)
    {
        switch(type)
        {
            case 'next':
                setPage(prevPage=>prevPage+1);
                return;
            case 'prev':
                setPage(prevPage=>prevPage-1);
                return;
            case 'home':
                setPage(1);
                return;
            default:
                return;


        }
    }    

    return (
        <Pagination>
            {page>1&&<Pagination.Prev onClick={()=>changePage('prev')}/>}
            {page!==1&&<Pagination.Item onClick={()=>changePage('home')}>{1}</Pagination.Item>}
            {page>2&&<Pagination.Ellipsis />}
            {page>2&&<Pagination.Item onClick={()=>changePage('prev')}>{page-1}</Pagination.Item>}
           
            <Pagination.Item active={true} >{page}</Pagination.Item>
            {nextPage&&<Pagination.Item onClick={()=>changePage('next')}>{page+1}</Pagination.Item>}
            {nextPage&&<Pagination.Next onClick={()=>changePage('next')}/>}
        </Pagination>
    )
}
