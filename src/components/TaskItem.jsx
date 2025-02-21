import { DeleteTask, UpdateTask } from "./Icons"

export function TaskItem (props) {
    const {id,todo, start, end, deleteTask, handleOpenModal} = props

    return (
        <div className="task-item">
            <div 
            draggable={true}
            onDragStart={start} 
            onDragEnd={end} 
            className='item'>{todo}
            </div>
            <button className="action" onClick={() => handleOpenModal('update', todo, id)}><UpdateTask /></button>
            <button className="action" onClick={() => deleteTask(id)}><DeleteTask /></button>
        </div>
    )
}
