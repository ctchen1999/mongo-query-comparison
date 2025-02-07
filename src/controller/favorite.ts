import { Favorite } from "../models/favorite";
import BaseController from "./base";

class FavoriteController extends BaseController {
    constructor() {
        super(Favorite as any)
    }
}

export default FavoriteController;