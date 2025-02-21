import { TaskItem } from './TaskItem';

export function Task({ title, items, onDrop, handleDragStart, handleDragEnd,deleteTask, handleOpenModal }) {
    return (
      <div className={`kanban-item ${title.toLowerCase().replace(" ", "-")}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onDrop(title.toLowerCase())}
      >
        <h2>{title}</h2>
        {items.map((item) => (
          <TaskItem
            key={item.id}
            id={item.id}
            start={() => handleDragStart(item.id)}
            end={handleDragEnd}
            todo={item.todo}
            deleteTask={deleteTask}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>
    );
}