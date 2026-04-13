export type TaskStatus = 'all' | 'to do' | 'in progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
  type: TaskStatus;
};

export const tasks: Task[] = [
  { id: '1', title: 'React.js', description: 'Task related to React.js', type: 'all' },
  { id: '2', title: 'Vue.js', description: 'Task related to Vue.js', type: 'all' },
  { id: '3', title: 'Next.js', description: 'Task related to Next.js', type: 'all' },
  { id: '4', title: 'Angular.js', description: 'Task related to Angular.js', type: 'all' },
  { id: '5', title: 'Java', description: 'Task related to Java', type: 'all' },
  { id: '6', title: 'Node.js', description: 'Task related to Node.js', type: 'all' },
];
