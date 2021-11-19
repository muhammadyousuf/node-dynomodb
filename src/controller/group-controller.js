const GroupService = require("../services/group.service");
const { OKSuccess } = require("../utils/success");
const {
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
} = require("../utils/error");

module.exports.groupCreate = async (req, res) => {
  try {
    const { body } = req;
    const groupService = new GroupService();
    const group = await groupService.groupCreate(body);

    const success = new OKSuccess("Successfully Added the group", group);
    res.status(success.status).send(success);
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err);
  }
};

module.exports.groupList = async (req, res) => {
  try {
    let result = await new GroupService().groupList(req);
    let response;

    // if (result?.admins?.length)
    response = new OKSuccess("Successfully Retrive the groups", result);
    //else response = new NotFoundError({ mesg: "No admin in the database" });
    res.status(response.status).send(response);
  } catch (err) {
    console.log("error", err);
    res.status(500).send(err);
  }
};
