const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

// The `/api/tags/:id` endpoint
router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleTag) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

//create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
    console.log("New Tag Created");
  } catch (err) {
    res.status(400).json("Something went wrong", err);
  }
});

//update a tag by id
router.put("/:id", async (req, res) => {
  try {
    const checkID = await Tag.findByPk(req.params.id);
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!checkID) {
      res.status(404).json("No Tag found with this id!");
      return;
    }
    res.status(200).json("Tag has been updated");
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

//delete a tag by id
router.delete("/:id", async (req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delTag) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }
    res.status(200).json({ mesage: "Tag Deleted" });
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

module.exports = router;
