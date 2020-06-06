import React from 'react'
import BlogList from '../pages/blog/BlogList'
import Slider from './Slider';

 const Dashboard = () => {
    return (
        <div className="contianer mt-3">
            <Slider className="mb-2"/>
            <hr />
           <BlogList />
        </div>
    )
}

export default Dashboard;