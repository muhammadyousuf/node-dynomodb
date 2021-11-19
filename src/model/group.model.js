const dynamoose = require("dynamoose");
const uuid = require("uuid");
const group = dynamoose.model(
  "group",
  new dynamoose.Schema(
    {
      id: {
        type: String,
        required: true,
        rangeKey: true,
        default: () => {
          return uuid.v4();
        },
        index: {
          local: true,
        },
      },
      name: String,
      admin: {
        type: String,
        hashKey: true,
        index: {
          global: true,
        },
      },
      isAppInstalled: {
        type: Boolean,
        required: true,
      },
    },
    {
      saveUnknown: true,
      timestamps: {
        createdAt: "createDate",
        updatedAt: null, // updatedAt will not be stored as part of the timestamp
      },
    }
  )
);

module.exports = group;
