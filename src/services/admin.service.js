const Admin = require("../model/admin.model");
const {
  ConfictError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  BadRequestError,
  ForbiddenError,
} = require("../utils/error");
var AWS = require("aws-sdk");


class AdminService {
  constructor() {}

  async adminCreate(body) {
    try {
      let admin = new Admin(body);
      console.log("admin", admin);
      const saveUser = await admin.save();
      return saveUser;
    } catch (err) {
      throw new InternalServerError({
        message: `admin create error`,
        data: err,
      });
    }
  }

  async onScan(err, data) {
    console.log("30");
    if (err) {
      console.error(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      data.Items.forEach(function (item) {
        console.log("item", item);
        return item;
      });
    }
  }

  async adminList(data) {
    try {
      AWS.config.update({
        region: "us-east-2",
      });

      var docClient = new AWS.DynamoDB.DocumentClient();

      var table = "admin";

      var params = {
        TableName: table,
        IndexName: "idGlobalIndex",
        //KeyConditionExpression: "uid = :id",
        // ExpressionAttributeNames: {
        //   uid: "id",
        // },
      };
let dataItem = await docClient.scan(params).promise();
//    let dba = await docClient.scan(params, async function (err, data) {
//         if (err) {
//           console.error(
//             "Unable to scan the table. Error JSON:",
//             JSON.stringify(err, null, 2)
//           );
//         } else {
//             console.log("item", data)
//             return data;
//         //   await data.Items.forEach(async function (item) {
//         //     console.log("item", item);
//         //     await dataItem.push(item);
//         //   });
//         }
//       });


      //.find()
      //   console.log("admins", admins);
      // .sort(mysort)
      // .limit(parseInt(parseInt(perPage)))
      // .skip(parseInt(_search ? 0 : skip * parseInt(perPage)));
      //   if (users.length >= 1) {
      //     const count = await User.countDocuments(querySearch);

      //     let pagination = await Pagination(count, perPage, skip);
      //     return { users, pagination };
      //   } else {
          console.log("line 89", dataItem);
      return dataItem;
      // }
    } catch (err) {
      console.log(err);
      throw new InternalServerError(err);
    }
  }
}

module.exports = AdminService;
