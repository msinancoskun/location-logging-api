export type Resp<T> = {
  success: boolean;
  data: T | Promise<T> | null;
  message?: string;
};

export type QueryParams<T> = {
  skip?: number;
  take?: number;
  filter?: keyof T;
};
