import request from 'supertest';
import mongoose, { Types } from 'mongoose';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

import app from '../index'; // adjust import as needed
import { User } from '../models/user';
import { Auth } from '../models/auth';
import { Favorite } from '../models/favorite';

import FakeDataController from '../utils/fakerDataGenerate';

const fakeDataController = new FakeDataController();

describe('User Routes', () => {
    let userId: string;
    let favoriteIds: any[];
    const documentNumbers = (global as any).documentNumbers;
    const queryDocumentNumbers = (global as any).queryDocumentNumbers;
    const queryDocumentRatio = (global as any).queryDocumentRatio;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/');
        userId = faker.database.mongodbObjectId();
    });
    
    afterAll(async () => {
        await mongoose.connection.close();
    });
    
    it('should create a auth', async () => {
        await Auth.deleteMany({});
        const authData = fakeDataController.getAuths();

        const res = await request(app).post('/auth').send(authData[0]);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.extra.data).toHaveProperty('_id');

        userId = res.body.extra.data._id;
    }, 10000);
    
    it('should create correct number of data', async () => {
        await Favorite.deleteMany({});
        const { normalUserFavorites, sameUserFavorites } = fakeDataController.getFavorites(userId,
            documentNumbers,
            queryDocumentNumbers,
            queryDocumentRatio);
        const totalUserFavorites = [...normalUserFavorites, ...sameUserFavorites];
        
        await Favorite.insertMany(normalUserFavorites);
        const sameUserFavoriteIds = await Favorite.insertMany(sameUserFavorites)
        favoriteIds = sameUserFavoriteIds.map((fav) => fav._id)

        expect(totalUserFavorites.length).toBe((global as any).documentNumbers);
    }, 10000);

    it('should create correct number of user.favorites', async () => {
        await User.deleteMany({});
        const user = new User({ 
            authId: new Types.ObjectId(userId),
            favorites: favoriteIds
        })
        await user.save();
    }, 10000);

    // it('should get normal user data', async () => {
    //     const times: number[] = [];

    //     for (let i = 0; i < documentNumbers; i++) {
    //         const start = Date.now();
    //         const res = await request(app)
    //             .get(`/user/normal/${userId}?nocache=${Date.now()}`)
    //             .set('Cache-Control', 'no-cache, no-store, must-revalidate')
    //             .set('Pragma', 'no-cache')
    //             .set('Expires', '0')
    //             .set('If-None-Match', 'no-match-for-this');
    //         const end = Date.now();
    //         times.push(end - start);
            
    //         expect(res.status).toBe(200);
    //     }

    //     fs.writeFileSync(path.join(__dirname, '../logs/normal.json'), JSON.stringify(times, null, 2));
    // }, 20000);

    // it('should get populate user data', async () => {
    //     const times: number[] = [];

    //     for (let i = 0; i < documentNumbers; i++) {
    //         const start = Date.now();
    //         const res = await request(app)
    //             .get(`/user/populate/${userId}?nocache=${Date.now()}`)
    //             .set('Cache-Control', 'no-cache, no-store, must-revalidate')
    //             .set('Pragma', 'no-cache')
    //             .set('Expires', '0')
    //             .set('If-None-Match', 'no-match-for-this');
    //         const end = Date.now();
    //         times.push(end - start);
    //         expect(res.status).toBe(200);
    //     }

    //     fs.writeFileSync(path.join(__dirname, '../logs/populate.json'), JSON.stringify(times, null, 2));
    // }, 20000);

    // it('should get lookup user data', async () => {
    //     const promises = Array(documentNumbers).fill(null).map(async () => {
    //         const start = Date.now();
    //         const res = await request(app)
    //             .get(`/user/lookup/${userId}`)
    //             .set('Cache-Control', 'no-cache, no-store, must-revalidate')
    //             .set('Pragma', 'no-cache')
    //             .set('Expires', '0')
    //             .set('If-None-Match', 'no-match-for-this');
    //         const end = Date.now();
    //         expect(res.status).toBe(200);
    //         return end - start;
    //     });

    //     const times = await Promise.all(promises);
    //     await new Promise<void>((resolve) => {
    //         fs.writeFile(path.join(__dirname, '../logs/lookup.json'), JSON.stringify(times, null, 2), () => resolve());
    //     });
    // }, 20000);
});