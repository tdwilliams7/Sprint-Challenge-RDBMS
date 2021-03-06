const express = require("express");
const knex = require("../database/db");
const projects = require("./projectControllers");

const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  projects.getAll().then(projects => {
    if (projects.length) {
      res.status(200).json(projects);
    } else {
      res.status(500).json({ msg: "No projects found" });
    }
  });
});

projectRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .getOne(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

projectRouter.post("/", (req, res) => {
  projects
    .addOne(req.body)
    .then(id => {
      res.status(200).json({ success: `Project created with id: ${id}` });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

projectRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .update(id, req.body)
    .then(success => {
      res.status(200).json({ msg: `Project ${id} updated!` });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

projectRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .nuke(id)
    .then(succ => {
      res.status(200).json({ msg: "Project deleted." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = projectRouter;
