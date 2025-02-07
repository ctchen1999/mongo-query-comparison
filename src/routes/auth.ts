import { Router } from "express";
import AuthController from "../controller/auth";

const authController = new AuthController()

const router = Router();

router.route("/auth")
    .post(async (req, res) => {
        const data = req.body;
        authController.create(data, (err, response) => res.send(response))
    })

    .get(async (req, res) => {
        authController.findList((err, response) => res.send(response))
    })

router.route("/auth/:authId")
    .get(async (req, res) => {
        const id = req.params.authId
        authController.findById(id, (err, response) => res.send(response))
    })

export default router;