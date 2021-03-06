const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if user is logged in

    //all methods in prisma.graphql are now accessible to us here
    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args },
      },
      info
    );

    return item;
  },
  // createDog(parent, args, ctx, info) {
  //   global.dogs = global.dogs || [];
  //   //create a dog
  //   const newDog = { name: args.name };
  //   global.dogs.push(newDog);
  //   return newDog;
  //},
};

module.exports = Mutations;
