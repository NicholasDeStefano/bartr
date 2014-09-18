exports.index = function (req, res) {

  var posts = [
    {
      title: "Post1",
      body: "filler text"
    },
    {
      title: "Post2",
      body: "filler text filler text"
    },
    {
      title: "Post3",
      body: "filler text filler text filler text"
    }
  ]

  res.send({data:posts})
}