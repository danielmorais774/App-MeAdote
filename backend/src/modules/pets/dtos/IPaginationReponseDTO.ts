export default interface IPaginationReponseDTO{
    data: any[];
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
}