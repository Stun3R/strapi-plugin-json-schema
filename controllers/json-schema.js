"use strict";

/**
 * json-schema.js controller
 *
 * @description: A set of functions called "actions" of the `json-schema` plugin.
 */

const _ = require("lodash");

const types = {
  string: "string",
  text: "string",
  richtext: "string",
  email: "string",
  password: "string",
  enumeration: "string",
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

const isTsType = (type) => {
  return type === 'any'
}

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Template of the response
    const jsonSchema = []

    // navigate through all strapi models
    for (const key in strapi.models) {
      // Only get the contentTypes
      if (strapi.models[key].modelType === "contentType") {
        // Specify the default value of the schema
        const schema = {
          title: _.capitalize(key),
          kind: strapi.models[key].kind,
          type: "object",
          properties: {},
          additionalProperties: false,
          required: []
        };

        // Remove useless field from the attributes
        const attributes = _.omit(strapi.models[key].attributes, [
          "created_by",
          "updated_by",
        ]);

        // Parse the attributes and create the properties object for type definition
        for (const index in attributes) {
          if (attributes[index].required) {
            schema.required.push(index)
          }
          const property = _.omit(attributes[index], ['pluginOptions', 'required'])
          
          if (isTsType(property.type)) {
            property.tsType = types[property.type]
          } else {
            property.type = types[property.type]
          }

          schema.properties[index] = property
        }

        // push to the response for the current model
        jsonSchema.push(schema);
      }
    }

    ctx.send(jsonSchema);
  },
};
