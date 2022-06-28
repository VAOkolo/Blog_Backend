function selectedPost(dataToUpdate, id) {
  return dataToUpdate.filter((hostPost) => {
    return hostPost.id == id;
  })[0];
}

module.exports = { selectedPost };
