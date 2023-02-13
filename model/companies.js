const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  permalink: String,
  crunchbase_url: String,
  homepage_url: String,
  blog_url: String,
  blog_feed_url: String,
  twitter_username: String,
  category_code: String,
  number_of_employees: Number,
  founded_year: Number,
  deadpooled_year: Number,
  tag_list: String,
  alias_list: String,
  email_address: String,
  phone_number: String,
  description: String,
  image: {
    type: Object,
    properties: {
      availablesize: {
        type: Array,
        name: String,
      },
    },
  },
  products: {
    type: Array,
    details: {
      type: Object,
      properties: {
        type: Object,
        properties: {
          name: String,
          permalink: String,
        },
      },
    },
  },
  relationships: {
    type: Array,
    info: {
      type: Object,
      properties: {
        type: Object,
        properties: {
          ispast: Boolean,
          title: String,
          person: {
            type: Object,
            properties: {
              first_name: String,
              last_name: String,
              permalink: String,
            },
          },
        },
      },
    },
  },
  City: {
    type: Array,
  },
  Address: {
    type: Array,
    info: {
      type: Object,
      properties: {
        pin: String,
        city: String,
        state: String,
      },
    },
  },
  dailyvisits: {
    type: Object,
    "no.": {
      properties: {
        number: Number,
      },
    },
  },
  personalDetails: {
    type: Object,
    info: {
      type: Object,
      properties: {
        education: {
          type: Object,
          proprties: {
            primary: {
              type: Object,
              properties: {
                class: String,
                percentage: String,
              },
            },
          },
        },
        family: {
          type: Object,
          properties: {
            name: String,
          },
        },
      },
    },
  },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
