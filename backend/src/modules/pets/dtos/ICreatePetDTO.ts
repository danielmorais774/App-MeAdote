import { Express } from "express";

export default interface ICreatePetDTO{
    name: string;
    gender: 'Male' | 'Female';
    age: number;
    color: string;
    tutorId: string;
    breedId: string;
    images?: Express.Multer.File[] | undefined;
}