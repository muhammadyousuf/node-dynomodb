const dynamoose = require("dynamoose");
const uuid = require("uuid");
const group = dynamoose.model(
  "group",
  new dynamoose.Schema(
    {
      id: {
        type: String,
        required: true,
        hashKey: true,
        default: () => {
          return uuid.v4();
        },
      },
      name: String,
      admin: {
        type: Array,
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
