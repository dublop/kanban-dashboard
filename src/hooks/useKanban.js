//import ToDos from '../mocks/todos.json'
import { useState, useEffect } from 'react'

export function useKanban() {
  const taskLocalStorage = window.localStorage.getItem('task')
  const initialTasks = taskLocalStorage ? JSON.parse(taskLocalStorage) : []
  const [taskList, setTaskList] = useState(initialTasks)

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(taskList)) 
  }, [taskList])

  const todoList = taskList.filter(todo => todo.stage == 'to do')
  const workingList = taskList.filter(todo => todo.stage == 'working')
  const doneList = taskList.filter(todo => todo.stage == 'done')

  const [draggedItem, setDraggedItem] = useState(null)

  const handleDragStart = (id) => {
    setDraggedItem(id)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const drop = (stageVal) => {
    if (draggedItem === null) return;

    const newTaskList = [...taskList].map((task) => {
      if(task.id === draggedItem) {
        return {
          ...task,
          stage: stageVal
        }
      } else {
        return task
      }
    })

    setTaskList(newTaskList)
    setDraggedItem(null)
  }

  const addNewTask = (text) => {
    const newTask = {
      "id": Date.now(),
      "todo": text,
      "stage": "to do",
    }

    setTaskList([...taskList, newTask])
  }

  const updateTask = (id, todo) => {
    const newTaskList = [...taskList].map(task => {
      if(task.id === id) {
        return {
          ...task,
          todo: todo
        }
      } else {
        return task
      }
    })
    
    setTaskList(newTaskList)
  }
  
  const deleteTask = (id) => {
    const newTaskList = [...taskList].filter(task => task.id !== id)

    setTaskList(newTaskList)
  }

  return {
    addNewTask,
    updateTask,
    deleteTask,
    todoList,
    workingList,
    doneList,
    handleDragStart,
    handleDragEnd,
    drop,
  }
}