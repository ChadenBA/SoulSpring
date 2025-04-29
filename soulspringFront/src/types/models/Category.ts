export interface Children {
  id: number;
  title: string;
  index?: number;
}

export interface Category {
  id: number;
  title: string;
  children: Children[];
}
