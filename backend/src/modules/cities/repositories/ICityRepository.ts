import City from "../infra/typeorm/entities/City";

export default interface ICityRepository {
  findById(id: string): Promise<City | undefined>;
  findAll(): Promise<City[]>;
}