const AdminService = require("../services/admin.service");
const { OKSuccess } = require("../utils/success");
const {
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
} = require("../utils/error");


module.exports.adminCreate = async (req, res) => {
  try {
    const { body } = req;
    const adminService = new AdminService();
    const admin = await adminService.adminCreate(body);

    const success = new OKSuccess("Successfully Added the admin", admin);
    res.status(success.status).send(success);
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err);
  }
};

module.exports.adminList = async (req, res) => {
  try {
    let result = await new AdminService().adminList(req);
    let response;

   // if (result?.admins?.length)
      response = new OKSuccess("Successfully Retrive the admin", result);
    //else response = new NotFoundError({ mesg: "No admin in the database" });
    res.status(response.status).send(response);
  } catch (err) {
    console.log("error", err);
    res.status(500).send(err);
  }
};
