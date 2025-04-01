
import { useEffect, useState } from 'react'

const useNetwork = () => {
    const [network, setNetwork] = useState(true)

    useEffect(() => {
        window.addEventListener('online',()=>{
            setNetwork(true)
        })
        window.addEventListener('offline',()=>{
            setNetwork(false)
        })
    })
    return network
}

export default useNetwork