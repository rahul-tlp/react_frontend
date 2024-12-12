import React, { useEffect, useState } from 'react'
import {Link,NavLink, useLoaderData} from 'react-router-dom'

function Github() {
    const data = useLoaderData();
    // const [data, setData] = useState([])
    // useEffect(()=> {
    //     fetch('https://api.github.com/users/rahul-tlp')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data)
    //     })
    // },[])
  return (
    <div className='text-center m-4 bg-gray-400 text-white p-4 text-3xl'>
        Github Followers : {data.followers}
        <img className='text-center' src={data.avatar_url} alt='Git profile Picture' width={300}/>
        {/* <a href={data.html_url}>Github Link</a> */}
        <Link
            to={data.html_url}
            target='_blank'
        >
            Github Link
        </Link>
     </div>
  )
}

export default Github

export const githubInfoLoader = async() => {
    const response = await fetch ('https://api.github.com/users/rahul-tlp');
    return response.json();
}