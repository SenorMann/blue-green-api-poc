import { Router } from "express";
import controllers from "./controllers";
import { checkJwt } from "./middleware";

const router = Router();

router.get("/api/menu/items", async (_req, res) => {
  const items = await controllers.findAll();
  res.json(items)
});


router.get("/api/menu/items/:id", async (req, res) => {
  const id: number = parseInt(req.params.id, 10);
  const item = await controllers.find(id);
  res.json(item)
});

router.use(checkJwt);

router.post("/api/menu/items", (req, res) => {
  const item: BaseItem = req.body;
  const newItem = controllers.create(item);
  res.status(201).json(newItem);
});


router.put("/api/menu/items/:id", async (req, res) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Item = req.body;
    const existingItem: Item = await controllers.find(id);

    if (existingItem) {
      const updatedItem = await controllers.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = controllers.create(itemUpdate);
    res.status(200).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

router.delete("/api/menu/items/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await controllers.remove(id);

    res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

export default router;