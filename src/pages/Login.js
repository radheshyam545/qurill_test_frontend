import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Login from '../features/user/Login'
import CompanyProfile from './employerProtected/CompanyProfile'

function ExternalPage(){


    return(
        <div className="">
                <Login />
                {/* <CompanyProfile/> */}
        </div>
    )
}

export default ExternalPage