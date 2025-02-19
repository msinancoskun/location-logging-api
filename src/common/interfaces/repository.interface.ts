export interface IRepository<T, U, V, W> {
  create(item: T): Promise<T>;
  getAll(params: {
    skip?: number;
    take?: number;
    cursor?: U;
    where?: V;
    orderBy?: W;
  }): Promise<T[]>;
}
