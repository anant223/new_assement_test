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
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
        </div>
        <div>
          Status :{" "}
          <select
            name="status"
            onChange={handleChange}
            value={newTaskAssign.status}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          >
            <option className='text-black' value="">Select status</option>
            <option className='text-black' value="Assign">Assign</option>
            <option className='text-black' value="UnAssign">UnAssign</option>
            <option className='text-black' value="Block">Block</option>
          </select>
        </div>
        <div className='py-2.5'>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm