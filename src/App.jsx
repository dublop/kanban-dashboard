import { useState } from "react";
import { Task } from "./components/Task";
import { useKanban } from "./hooks/useKanban";
import { AddTask } from "./components/Icons";

function App() {
  const {
    addNewTask,
    updateTask,
    deleteTask,
    todoList,
    workingList,
    doneList,
    handleDragStart,
    handleDragEnd,
    drop,
  } = useKanban();

  const [modal, setModal] = useState({
    action: 'add',
    title: 'Add new task',
    show: false
  });

  const [newTask, setNewTask] = useState('')
  const [updateId, setUpdateId] = useState(0)

  const handleOpenModal = (action, todo, id) => {
    if (action === 'add') {
      setModal({
        action: 'add',
        title: 'Add new task',
        show: true
      })
    } else {
      setUpdateId(id)
      setNewTask(todo)
      setModal({
        action: 'update',
        title: 'Update new task',
        show: true
      })
    }
  }
  const handleCloseModal = () => {
    setModal({
      ...modal,
      show: false
    })
    setNewTask('')
  }

  const handleNewTask = (todo) => {
    if (todo == '') return

    if(modal.action == 'add') {
      addNewTask(todo)
    } else {
      updateTask(updateId, todo)
    }

    handleCloseModal()
  }
  
  return (
    <div className="container">
      <header>
        <h1>Kanban Dashboard</h1>
        <button onClick={() => handleOpenModal('add')}><AddTask/> Add new task</button>
      </header>

      {modal.show && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modal.title}</h2>
            <input
              type="textarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Learn how to use a french press..."
            />
            <div className="btn-container">
              <button className="save"
                onClick={() => handleNewTask(newTask)}
               >Save</button>
              <button
                className="cancel"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="kanban-container">
        <Task
          title="To Do"
          items={todoList}
          onDrop={drop}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          deleteTask={deleteTask}
          handleOpenModal={handleOpenModal}
        />
        <Task
          title="Working"
          items={workingList}
          onDrop={drop}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
        <Task
          title="Done"
          items={doneList}
          onDrop={drop}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}

export default App;
