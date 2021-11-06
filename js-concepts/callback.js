const doworkcallback = (callback) => {
  setTimeout(() => {
    //callback("This is my error", undefined);
    callback(undefined, [1, 4, 7]);
  }, 2000);
};
doworkcallback((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});
