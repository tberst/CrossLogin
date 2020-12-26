import React from 'react'
import TaskList from './Tasks/TaskList'
import UserCard from './Tasks/UserCard'

interface Props {
    isAuthenticated: Boolean
}

function UserContent(props: Props) {
    const { isAuthenticated } = props


    return (<React.Fragment>
        { isAuthenticated && 
            <div className="w-screen flex flex-row justify-items-start flex-1">
                <div id="sidebar" className="w-1/5">
                    <UserCard isAuthenticated={isAuthenticated}></UserCard>
                </div>
                <div id="main" className="bg-gray-200 w-4/5">
                    <TaskList isAuthenticated={isAuthenticated}></TaskList>
                </div>
            </div>
        }
        </React.Fragment>
    )
}

export default UserContent
