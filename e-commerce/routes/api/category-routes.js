const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const CateogryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CateogryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!CategoryData) {
      res.status(404).json({ message: "That ID does not exist" });
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post("/", async (req, res) => {
  try {
    const CategoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//updates a category by id
router.put("/:id", async (req, res) => {
  try {
    const CategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData[0]) {
      res.status(404).json({ message: "No cateogry with this id!" });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const CategoryData = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!CategoryData) {
      res.status(404).json({ message: "That ID does not exist" });
    }
    res.status(200).json({ message: "Cateogry deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
