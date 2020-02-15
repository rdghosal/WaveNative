import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext';

const History = () => {
    const { currentUser } = useContext(GlobalContext);

    return (
        <div>
            <p>Hello, {currentUser.type} !</p>            
        </div>
    )
}

export default History;