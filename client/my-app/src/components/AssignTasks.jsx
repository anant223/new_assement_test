import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AssignTasks = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    const assignTaskData = async () => {
      try {
        setLoading(true);
        const fetchTasks = await fetch(`http://localhost:3000/all`, {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
        });

        const respose = await fetchTasks.json();
        console.log(respose);
        setTasks(respose.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
        return;
      }
    };
    useEffect(() => {
        assignTaskData()
    },[])
        if(loading) return <div>Loading...</div>
  return (
    <div style={{ color: "white" }}>
      <button onClick={assignTaskData} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Tasks"}
      </button>
      <div>
        {tasks.length > 0 ? (
          tasks?.map((task) => (
            <div>
              <Link to={`/task/${task?.assign_to}`}>
                http://localhost:5127/task/{task?.assign_to}
              </Link>
            </div>
          ))
        ) : (
          <div> not found </div>
        )}
      </div>
    </div>
  );
}

export default AssignTasks