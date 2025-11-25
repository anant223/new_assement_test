import React from 'react'
import TaskForm from '../components/TaskFrom'
import UserFrom from '../components/UserFrom'
import AssignTasks from '../components/AssignTasks'

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          justifyItems: "center",
          margin: "auto"
        }}
      >
        <UserFrom />
        <TaskForm />
      </div>
      <div>
        <AssignTasks />
      </div>
    </div>
  );
}

export default Home