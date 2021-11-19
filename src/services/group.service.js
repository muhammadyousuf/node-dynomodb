const Group = require("../model/group.model");
const {
  ConfictError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  BadRequestError,
  ForbiddenError,
} = require("../utils/error");
var AWS = require("aws-sdk");

const Post = require("../model/post.model");

class GroupService {
  constructor() {}

  async groupCreate(body) {
    try {
      let group = new Group(body);
      console.log("admin", group);
      const groupSave = await group.save();
      return groupSave;
    } catch (err) {
      throw new InternalServerError({
        message: `group create error`,
        data: err,
      });
    }
  }


  async groupList() {
    try {
      AWS.config.update({
        region: "us-east-2",
      });

      var docClient = new AWS.DynamoDB.DocumentClient();
      var table = "group";

      var params = {
        TableName: table,
        IndexName: "adminGlobalIndex",
        KeyConditionExpression: "#uid = :admin",
        ExpressionAttributeNames: {
          "#uid": "admin",
        },
        ExpressionAttributeValues: {
          ":admin": "c834440f-55d3-47a7-a745-ad60f428402d",
        },
      };
      let dataItem = await docClient.query(params).promise();
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

module.exports = GroupService;
