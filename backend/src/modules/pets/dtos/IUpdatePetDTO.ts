export default interface IUpdatePetDTO{
    name: string;
    gender: 'Male' | 'Female';
    age: number;
    color: string;
    breedId: string;
    images?: Express.Multer.File[] | undefined;
    imagesDeleted?: string[];
    userId: string;
}