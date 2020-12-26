import consola from 'consola';
import React, { useState } from 'react'
import { getUserTasks } from '../../../Services/GraphService';
import MsalClient from '../../../Services/MsalClient';
import TaskCard from './TaskCard';


interface Props {
    isAuthenticated: Boolean
}

function TaskList(props: Props) {
    const { isAuthenticated } = props
    const [tasks, setTasks] = useState<any>(null)

    React.useEffect(() => {
        consola.info("TaskList => isAuth useEffect")
        async function tmp() {
            if (isAuthenticated) {
                const client = new MsalClient(); 
                const token = await client.getAccessToken(["Group.Read.All"]);
                const tasks = await getUserTasks(token)
                setTasks(tasks);
            }
            else {
            }
        }    // Execute the created function directly
        tmp();


    }, [isAuthenticated]);
    let taskarray = []
    if (tasks) {
        taskarray = tasks.map((t: any) => {
            return (
                    <TaskCard {...t}></TaskCard>
              )
        });
    }
    return (
        <div>{isAuthenticated && tasks &&  <div className="flex">{taskarray}</div>}</div>
    )
}

export default TaskList
