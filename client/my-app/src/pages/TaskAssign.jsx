import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const TaskAssign = () => {
  const param = useParams();
  const [loading, setLoading] = useState(true)
  console.log(param?.id);
  const [task, setTask] = useState();
  useEffect(() => {
    const taskDetail = async () => {

      try {
        console.log("task")
        setLoading(true)
        const fetchTask = await fetch(
          `http://localhost:3000/task/${param?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(fetchTask);

        if (!fetchTask.ok) {
          throw new Error(`HTTP error! status: ${fetchTask.status}`);
        }

        const response = await fetchTask.json();
        console.log(response);

        if (response.success) {
          setLoading(false)
          setTask(response.data);
        } else {
          console.error("Failed to fetch tasks:", response.message);
        }
      } catch (error) {
        setLoading(false)
        console.error("Error fetching tasks:", error.message);
      }
    };

    if (param?.id) {
      taskDetail();
    }
  }, [param?.id]);
  if(loading) return<div>loading...</div>
  return (
    <div className='min-h-screen bg-gray-800 text-gray-200'>
      <div className='container mx-auto py-24'>
        {console.log(task)}
        {task[0]?.status !== "Block" && (
          <div className=' capitalize'>Username : {task[0]?.assign_to?.username}</div>
        )}
        <div>This id is {task[0]?.status}ed</div>
      </div>
    </div>
  );
}

export default TaskAssign