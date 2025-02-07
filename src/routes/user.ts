import express, { Router } from "express";
import UserController from "../controller/user";

const userController = new UserController();

const router = Router();

router.route("/user")
    .post(async (req, res) => {
        const data = req.body;
        userController.create(data, (err, response) => res.send(response))
    })

router.route("/user/normal/:authId")
    .get(async (req, res) => {
        const authId = req.params.authId;
        userController.readUserNormal(authId, (err, response) => res.send(response))
    })

router.route("/user/populate/:authId")
    .get(async (req, res) => {
        const authId = req.params.authId;
        userController.readUserPopulate(authId, (err, response) => res.send(response))
    })

router.route("/user/lookup/:authId")
    .get(async (req, res) => {
        const authId = req.params.authId;
        userController.readUserLookup(authId, (err, response) => res.send(response))
    })

export default router;