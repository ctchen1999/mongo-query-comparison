import { Auth } from "../models/auth";
import BaseController from "./base";

class AuthController extends BaseController {
    constructor() {
        super(Auth as any)
    }
}

export default AuthController;