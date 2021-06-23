module.exports = async (ctx, next) => {
  if (ctx.state.isAuthenticatedAdmin) {
    return await next();
  }

  ctx.unauthorized(`You're not allowed to perform this action!`);
};
