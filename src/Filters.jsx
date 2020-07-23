import React from 'react'
export default function Filters({filters,changeFilters}) {
   
    return (
        <form >
        <span className='description'>
        <label >Job Description: </label>
        <input  type='text' name ='description' value={filters.description} onChange={changeFilters}/>

        </span>
        
        <span className='location'>
        <label >Location: </label>
        <input  type='text'name = 'location' value={filters.location} onChange={changeFilters}/>
        </span>
        
      </form>
    )
}
