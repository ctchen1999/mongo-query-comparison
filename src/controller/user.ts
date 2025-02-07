import { Types } from "mongoose";

import type { ResCallback } from "../models/interface/callback";
import { User } from "../models/user";
import { Favorite } from "../models/favorite";
import BaseController from "./base";

class UserController extends BaseController {
    constructor() {
        super(User as any) 
    }

    async readUserNormal(id: string, callback: ResCallback) {
        const user = await User.findOne({ authId: id }).exec();
        if (!user) {
            return callback(null, {
                success: false,
                extra: "User not found",
            })
        }

        const favorites = await Favorite.find({ userId: user.authId}).exec();
        return callback(null, {
            success: true,
            extra: {
                length: favorites.length,
                favorites
            },
        })
    }
    
    async readUserPopulate(id: string, callback: ResCallback) {
        const user = await User.findOne({ authId: id }).populate('favorites').exec();
        
        if (!user) {
            return callback(null, {
                success: false,
                extra: "User not found",
            })
        }
        const favorites = user.favorites;
        return callback(null, {
            success: true,
            extra: {
                length: favorites.length,
                favorites
            },
        })
    }
    
    async readUserLookup(id: string, callback: ResCallback) {
        const user = await User.aggregate([
            {
                $match: {
                    authId: new Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "favorites",
                    localField: "authId",
                    foreignField: "userId",
                    as: "favorites"
                }
            }
        ])
        if (!user) {
            return callback(null, {
                success: false,
                extra: "User not found",
            })
        }
        
        const favorites = user[0].favorites;
        return callback(null, {
            success: true,
            extra: {
                length: favorites.length,
                favorites
            },
        })
    }
}

export default UserController;