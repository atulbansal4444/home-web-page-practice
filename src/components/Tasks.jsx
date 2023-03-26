import React, { useState } from "react";
import uuid from 'uuid/v4';

const Tasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const completeTask = completedTask => () => {
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter(task => task.id !== completedTask.id));
  }

  const deleteTask = deleteTask => () => {
    setCompletedTasks(completedTasks.filter(task => task.id !== deleteTask.id));
  }

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={task} onChange={(e) => setTask(e.target.value)} />
        <button
          onClick={() => {
            setTasks([...tasks, {taskText: task, id: uuid()}]);
            setTask("");
          }}>
          Submit
        </button>
      </div>
      <div className="task-list">
        {
          tasks.map(task => {
            const { id, taskText } = task;
            return (
              <div key={id} onClick={completeTask(task)}>
                {taskText}
              </div>);
          })
        }
      </div>
      <div className="completed-list">
        {
          completedTasks.map(completedTask => {
            const { id, taskText } = completedTask;
            return (
              <div key={id}>
                {taskText}{' '}
                <span className="delete-task"
                  onClick={deleteTask(completedTask)}>
                  {'x'}
                </span>
              </div>);
          })
        }
      </div>
    </div>
  );
};

export default Tasks;
