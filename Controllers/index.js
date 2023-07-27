const constant = require("../Utils/constant");
const redisClient = require("../Config/redis");


module.exports.getSpeciesData = async (req, res) => {
  const species = req.params.species;
  let results;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get(species);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await constant.fetchApiData(species);
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.setEx(species, 5, JSON.stringify(results));
    }

    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}


module.exports.signup = async (req, res) => {
  if(req.session.user) {
    return res.redirect("/")
  } else {
    res.render('signup', {
      title: 'sign up',
    })
  }
  
}

module.exports.signin = async (req, res) => {
  if(req.session.user) {
    return res.redirect("/")
  } else {
    res.render('signin', {
      title: 'sign in',
    })
  }
}

module.exports.logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/signin");
}