const express = require("express");

const Projects = require("./projects-model");

const {
    validateProjID,
    validateProjBody,
    validateProjUpdate,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      if (!projects) {
        res.send([]);
      } else {
        res.status(200).json(projects);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get("/:id", validateProjID, (req, res, next) => {
  res.status(200).json(req.project);
});

router.post("/", validateProjBody, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put("/:id", validateProjID, validateProjUpdate, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch(next);
});

router.delete("/:id", validateProjID, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "project deleted" });
    })
    .catch(next);
});

router.get("/:id/actions", validateProjID, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      if (!actions) {
        res.send([]);
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(next);
});

module.exports = router;
