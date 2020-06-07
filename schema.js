const fetch = require("node-fetch");
const _ = require("lodash");

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    spotPrice(currency: String!): Price
    currencies: [Currency]
  }
  
  type Currency {
      id: ID,
      name: String
  }

  type Price {
    amount: String
    currency: String
  }
`;

const baseURL = "https://api.coinbase.com/v2";

const resolvers = {
  Query: {
    currencies: async () => {
      try {
        const results = await fetch(`${baseURL}/currencies`);
        const currencies = await results.json();

        return currencies.data;
      } catch (e) {
        console.error(e);
      }
    },
    spotPrice: async (_root, { currency }) => {
      try {
        const results = await fetch(`${baseURL}/prices/BTC-${currency}/spot`);
        const spotPrice = await results.json();

        return spotPrice.data;
      } catch (e) {
        console.error(e);
      }
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
