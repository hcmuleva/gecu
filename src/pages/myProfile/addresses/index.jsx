import React, { useEffect, useState } from 'react'
import CreateAddress from './CreateAddress'
import ListAddress from './ListAddress'
import { Button } from 'antd'

export default function AddressDetails() {
    const [user,setUser] = useState("")
    const [type,setType] = useState("LIST")
   
  return (
    <div>
        {type==="LIST"&&<Button color='dander' variant='dashed' onClick={()=>{setType("CREATE")}}>CreateAddress</Button>}
        {type==="CREATE"&&<Button color='dander' variant='dashed' onClick={()=>{setType("LIST")}}>ListAddress</Button>}
     {type==="CREATE"&& <CreateAddress user={user} setType={setType}/>}
      {type==="LIST"&&<ListAddress user={user} setType={setType} />}
    </div>
  )
}
