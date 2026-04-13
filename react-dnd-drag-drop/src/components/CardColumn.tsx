import { useMemo } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import type { Task, TaskStatus } from "../types/types";
import CardView from "./CardView";

interface ColumnProps {
  id: TaskStatus;
  label: string;
  tasks: Task[];
}

interface DraggableTaskCardProps {
  task: Task;
}

const DraggableTaskCard = ({ task }: DraggableTaskCardProps) => {
    const { attributes, listeners, transform, setNodeRef } = useDraggable({ id: task.id });
    const style = useMemo(() => ({
      transform: CSS.Translate.toString(transform),
      cursor: 'grab',
    }), [transform]);
  
    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <CardView title={task.title} description={task.description} />
      </div>
    );
  }
  
const Column = ({ id, label, tasks }: ColumnProps) => {
    const { setNodeRef } = useDroppable({ id });

    return (
      <div ref={setNodeRef} className="bg-white border border-gray-200 shadow-sm min-h-[300px] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-lg">{label}</div>
          <span className="text-xs text-gray-500">{tasks.length <= 1 ? `${tasks.length} item` : `${tasks.length} items`}</span>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <DraggableTaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    );
}

export default Column;