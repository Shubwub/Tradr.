const {
  selectAllProjects,
  selectTradersByProject,
  insertNewProject,
  selectProjectById,
  updateProject,
  insertTraderToProject,
  fetchImagesByProjectId,
  insertImageToProject
} = require('../models/projects-models');

exports.getAllProjects = (req, res, next) => {
  return selectAllProjects(req.query)
    .then(projects => {
      res.status(200).send({ projects });
    })
    .catch(next);
};

exports.getTradersByProject = (req, res, next) => {
  return selectTradersByProject(req.params.id)
    .then(traders => {
      res.status(200).send({ traders });
    })
    .catch(next);
};

exports.postNewProject = (req, res, next) => {
  return insertNewProject(req)
    .then(project => {
      res.status(201).send({ project });
    })
    .catch(next);
};

exports.getProjectsById = (req, res, next) => {
  return selectProjectById(req.params.id)
    .then(project => {
      res.status(200).send({ project });
    })
    .catch(next);
};

exports.patchProject = (req, res, next) => {
  updateProject(req.body, req.params.id)
    .then(project => {
      res.status(200).send({ project });
    })
    .catch(next);
};

exports.postTraderToProject = (req, res, next) => {
  const body = {
    project_id: req.params.id,
    trader_username: req.body.username
  };
  insertTraderToProject(body)
    .then(project => {
      res.status(201).send({ project });
    })
    .catch(next);
};

exports.getImagesByProjectId = (req, res, next) => {
  return fetchImagesByProjectId(req.params.id)
    .then(images => {
      res.status(200).send({ images });
    })
    .catch(next);
};

exports.postImageToProject = (req, res, next) => {
  const image = {
    project_id: req.params.id,
    path: req.body.path
  };

  return insertImageToProject(image).then(image => {
    res.status(201).send(image);
  });
};
