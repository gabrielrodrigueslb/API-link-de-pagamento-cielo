import { Router } from "express";
import { CriarLinkController } from "../controller/linkDePagamentoController.js";

const router = Router()

router.post('/criarLink', CriarLinkController)

export default router