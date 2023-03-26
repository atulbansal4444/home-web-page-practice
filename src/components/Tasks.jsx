import React, { useState, useEffect } from "react";
import uuid from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'LOCAL_STORAGE_KEY';

const storeTasks = (taskMap) => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(taskMap)
  );
};

const readLocalStorageTask = () => {
  const taskMap = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return taskMap ? taskMap : { tasks: [], completedTasks: [] };
}

const Tasks = () => {
  const storedTasks = readLocalStorageTask();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(storedTasks.tasks);
  const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);

  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  });

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
