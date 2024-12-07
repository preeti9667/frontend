'use client'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { Box } from '@mui/material'

interface hello {
    title: string,
    description: string,
    endTime: string,
    startTime: string,
    status: string,
  date: number
}


const Users = () => {

    // const [userList, setUserList] = useState(null)
    const [userList, setUserList] = useState<hello[]>([])


console.log(userList)


const getUserList = async()=>{
    
    
    let res = await fetch('http://localhost:4000/meeting')
    let data = await res.json()
    setUserList(data)
    // console.log(data)
}      
useEffect(()=>{

    getUserList()

        },[])

  return (
    <AdminLayout>
        <Box>
            <Box sx={{border:"2px solid black", margin:"43px"}}>
                <Box sx={{background:'red', height:"80px"}}>
                    hello
                </Box>
                <hr/>
                    <Box>
                   
                        
                    </Box>
            hello users
            </Box>
        </Box>
    </AdminLayout>
  )
}

export default Users;


