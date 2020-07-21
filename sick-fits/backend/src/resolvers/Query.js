const { forwardTo } = require("prisma-binding");

const Query = {
  // forwarding api request straight to the server
  // useful if we don't need a custom resolver
  items: forwardTo("db"),
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
