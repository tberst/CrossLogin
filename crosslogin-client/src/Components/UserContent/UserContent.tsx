import React from 'react'
import GraphTasks from './Tasks/GraphTasks'

interface Props {
    isAuthenticated:Boolean
}

function UserContent(props: Props) {
    const {isAuthenticated} = props


    return (
         <GraphTasks isAuthenticated={isAuthenticated}></GraphTasks>
    )
}

export default UserContent
