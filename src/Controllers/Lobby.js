const path = require("path");
const PathFolder = require("../Utils/Path");
const PatientsData = require(path.join(PathFolder.pathModels, "Patients"));
const GetDate = require(path.join(PathFolder.pathModels, "Get time"));

exports.getLobby = (req, res, next) => {
  const Path = path.join(PathFolder.pathViews, "Lobby.pug");
  const dataForRender = {
    datagenders: (datagenders = require(path.join(
      PathFolder.pathData,
      "Data",
      "Genders.json"
    ))),
    datadiseases: (datadiseases = require(path.join(
      PathFolder.pathData,
      "Data",
      "Kind of diseases.json"
    ))),
    datapatients: (datapatients = PatientsData.return()),
  };
  res.render(Path, dataForRender);
};

exports.postAddPatient = (req, res, next) => {
  const temp = JSON.parse(JSON.stringify(req.body));
  temp.date = GetDate.time();
  const patient = new PatientsData(temp);
  patient.save();
  res.redirect("/lobby");
};
