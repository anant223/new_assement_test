import React from 'react'
import TaskForm from '../components/TaskFrom'
import UserFrom from '../components/UserFrom'
import AssignTasks from '../components/AssignTasks'

const Home = () => {
  return (
    <div className=" min-h-screen w-full bg-gray-800 text-[#ffff]">
      <div className=' container mx-auto py-24'>
        <div className=' flex justify-between items-center'>
          <UserFrom />
          <TaskForm />
        </div>
        <div className='py-24 flex justify-center'>
          <AssignTasks />
        </div>
      </div>
    </div>
  );
}

export default Home