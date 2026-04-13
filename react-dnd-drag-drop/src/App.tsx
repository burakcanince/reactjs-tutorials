import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { tasks as allTasks, type Task, type TaskStatus } from './types/types';
import CardView from './components/CardView';
import Column from './components/CardColumn';

function App() {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const overId = event.over?.id ?? null;
    const allowed: TaskStatus[] = ['all', 'to do', 'in progress', 'done'];
    if (overId && allowed.includes(overId as TaskStatus)) {
      setTasks((prev) =>
        prev.map((task) => (task.id === String(event.active.id) ? { ...task, type: overId as TaskStatus } : task))
      );
    }
    setActiveId(null);
  }

  useEffect(() => {
    const task = tasks.find((task) => task.id === activeId) ?? null;
    setActiveTask(task);
  }, [activeId, tasks]);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl text-center font-bold mb-5">Drag and Drop Tutorial</h1>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Column
            id="all"
            label="All"
            tasks={tasks.filter((task) => task.type === 'all')}
          />
          <Column
            id="to do"
            label="To Do"
            tasks={tasks.filter((task) => task.type === 'to do')}
          />
          <Column
            id="in progress"
            label="In Progress"
            tasks={tasks.filter((task) => task.type === 'in progress')}
          />
          <Column
            id="done"
            label="Done"
            tasks={tasks.filter((task) => task.type === 'done')}
          />
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="cursor-grabbing">
              <CardView title={activeTask.title} description={activeTask.description} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
