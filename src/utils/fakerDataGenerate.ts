import { faker } from '@faker-js/faker';
import { shuffleArray } from './shuffle';

interface IAuth {
    _id: string;
    name: string;
    email: string;
}

interface IFavorite {
    userId: string;
    movieId: number;
}

interface IFavoriteResponse {
    normalUserFavorites: IFavorite[];
    sameUserFavorites: IFavorite[];
}

class FakeDataController {
    _auths: IAuth[];

    constructor() {
        this._auths = [];
    }
    
    getAuths(): IAuth[] {
        this._auths = faker.helpers.multiple(createRandomAuth, {
            count: 1
        });
        return this._auths;
    }
    
    getFavorites(userId: string, total: number, count: number, samePercent?: number): IFavoriteResponse {
        const sameUserFavoritesAmount = !!samePercent ? Math.floor(total * samePercent) : count;
        const normalUserFavoritesAmount = total - sameUserFavoritesAmount;
        const sameUserFavorites = createRandomFavorites(userId, sameUserFavoritesAmount);
        const normalUserFavorite = faker.helpers.multiple(createRandomFavorite, {
            count: normalUserFavoritesAmount
        })
        return {
            normalUserFavorites: normalUserFavorite,
            sameUserFavorites: sameUserFavorites
        };
    }
}

const createRandomAuth = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.internet.username(),
        email: faker.internet.email()
    };
}

const createRandomFavorite = () => { 
    return {
        userId: faker.database.mongodbObjectId(),
        movieId: faker.number.int()
    };
}

const createRandomFavoriteSameUserId = (userId: string) => {
    return {
        userId: userId,
        movieId: faker.number.int()
    };
}

const createRandomFavorites = (userId: string, count: number) => {
    return Array.from({ length: count }, () => createRandomFavoriteSameUserId(userId));
}

export default FakeDataController;