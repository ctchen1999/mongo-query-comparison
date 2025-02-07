import  { Document, Model } from "mongoose";
import type { ResCallback } from "../models/interface/callback";

class BaseController {
    _Model: Model<Document>;

    constructor(tModel: Model<Document>) {
        this._Model = tModel
    }

    async create(newObj: Document, callback: ResCallback): Promise<void> {
		const newDoc: Document = new this._Model(newObj)

        const data = await newDoc.save()
        
        const apiResponse = {
            success: true,
            extra: {
                data
            },
        };
        return callback(null, apiResponse)
    }

    async findList(callback: ResCallback) {
        const data = await this._Model.find()
        const apiResponse = {
            success: true,
            extra: {
                data
            },
        };
        return callback(null, apiResponse)
    }

    async findById(id: string, callback: ResCallback) {
        const data = await this._Model.findById(id)

        const apiResponse = {
            success: true,
            extra: {
                data
            },
        };
        return callback(null, apiResponse)
    }
}

export default BaseController;