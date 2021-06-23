"use strict";

/**
 * sdk-bridge.js controller
 *
 * @description: A set of functions called "actions" of the `sdk-bridge` plugin.
 */

const _ = require("lodash");

const types = {
  string: "string",
  text: "string",
  richtext: "string",
  email: "string",
  password: "string",
  integer: "number",
  biginteger: "number",
  float: "number",
  decimal: "number",
  date: "any",
  time: "any",
  datetime: "any",
  boolean: "boolean",
  json: "any",
  uid: "string",
};

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Template of the response
    const models = {
      contentTypes: [],
      schema: [],
    };

    // navigate through all strapi models
    for (const key in strapi.models) {
      // Only get the contentTypes
      if (strapi.models[key].modelType === "contentType") {
        const contentType = {
          name: key,
          type: strapi.models[key].kind,
        };

        // Specify the default value of the schema
        const schema = {
          $schema: "http://json-schema.org/schema#",
          title: _.capitalize(key),
          type: "object",
          properties: {},
        };

        // Remove useless field from the attributes
        const attributes = _.omit(strapi.models[key].attributes, [
          "created_by",
          "updated_by",
        ]);

        // Parse the attributes and create the properties object for type definition
        for (const index in attributes) {
          if (attributes[index].type === "enumeration") {
            schema.properties[index] = { enum: attributes[index].enum };
          } else {
            schema.properties[index] = { type: types[attributes[index].type] };
          }
        }

        // push to the response for the current model
        models.contentTypes.push(contentType);
        models.schema.push(schema);
      }
    }

    ctx.send(models);
  },
};
