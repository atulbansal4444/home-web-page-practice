import React, { useState, useReducer } from "react";
import uuid from 'uuid/v4';

const initialState = {
  tasks: [],
  completedTasks: []
};

const taskReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };
    case TYPES.COMPLETE_TASK:
      const { completedTask } = action;
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== completedTask.id),
        completedTasks: [...state.completedTasks, completedTask]
      }
    case TYPES.DELETE_TASK:
      const { deleteTask } = action;
      return {
        ...state,
        completedTasks: state.completedTasks.filter(task => task.id !== deleteTask.id)
      }
    default:
      return state;
  }
}

const TYPES = {
  'ADD_TASK': 'ADD_TASK',
  'COMPLETE_TASK': 'COMPLETE_TASK',
  'DELETE_TASK': 'DELETE_TASK'
}

const LOCAL_STORAGE_KEY = 'LOCAL_STORAGE_KEY';

const storeTasks = (taskMap) => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(taskMap)
  );
};

const readLocalStorageTask = () => {
  const taskMap = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return taskMap ? taskMap : initialState;
}

const Tasks = () => {
  const storedTasks = readLocalStorageTask();
  const [state, dispatch] = useReducer(taskReducer, storedTasks);
  const { tasks, completedTasks } = state;
  const [task, setTask] = useState("");

  const completeTask = completedTask => () => {
    dispatch({ type: TYPES.COMPLETE_TASK, completedTask });
  }

  const deleteTask = deleteTask => () => {
    dispatch({ type: TYPES.DELETE_TASK, deleteTask });
  }

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={task} onChange={(e) => setTask(e.target.value)} />
        <button
          onClick={() => {
            dispatch({type: TYPES.ADD_TASK, task: {taskText: task, id: uuid()}});
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
