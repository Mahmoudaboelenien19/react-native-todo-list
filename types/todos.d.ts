export type TODO = {
  isCompleted: boolean;
  content: string;
  id: number;
};

export type Filter = 'all' | 'pending' | 'completed';
