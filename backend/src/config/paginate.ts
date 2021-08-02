interface IPaginateConfig{
    limit: number;
}

export default {
    limit: process.env.LIMIT || 15,
} as IPaginateConfig;