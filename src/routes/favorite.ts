import { Router } from "express"
import FavoriteController from "../controller/favorite"

const favoriteController = new FavoriteController()

const router = Router()

router.route("/favorite")
    .post(async (req, res) => {
        const data = req.body;
        favoriteController.create(data, (err, response) => res.send(response))
    })
    .get(async (req, res) => {
        const data = await favoriteController.findList((err, response) => res.send(response))
    })

router.route("/favorite/:favoriteId")
    .get(async (req, res) => {
        const id = req.params.favoriteId
        favoriteController.findById(id, (err, response) => res.send(response))
    })

export default router;