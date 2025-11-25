import React from 'react'
import { useState } from 'react'

const TaskForm = () => {
    const [newTaskAssign, setNewTaskAssign] = useState({
        assign_to: '',
        status: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewTaskAssign(prev =>  ({...prev, [name] : value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
          const createTask = await fetch(`http://localhost:3000/assign`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTaskAssign),
          });

          const jsonData = await createTask.json();
          if (jsonData?.success) {
            alert("Task assigned successfully");
            useState({
              assign_to: "",
              status: "",
            });
          }
        } catch (error) {
          console.log(error.message);
          return;
        }
    }

  return (
    <div>
      <form>
        <div>
          Assing_to :{" "}
          <input
            type="text"
            name="assign_to"
            onChange={handleChange}
            value={newTaskAssign.assign_to}
            placeholder="Assign_to"
          />
        </div>
        <div>
          Status :{" "}
          <select
            name="status"
            onChange={handleChange}
            value={newTaskAssign.status}
          >
            <option value="">Select status</option>
            <option value="Assign">Assign</option>
            <option value="UnAssign">UnAssign</option>
            <option value="Block">Block</option>
          </select>
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm