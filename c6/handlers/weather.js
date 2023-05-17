// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

let cache = {};

const getCity = async (req, res) => {
  let key = "2cf6f21794e165121aab02c23946cc7e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${key}`;

  console.log(cache);
  if (
    cache[req.params.city] &&
    cache[req.params.city].cacheTime !== null &&
    cache[req.params.city].cacheTime + 60 * 1000 < new Date().getTime() //so ova proveruvame dali pominale 60 sekundi
  ) {
    cache[req.params.city].localCache = null;
  }

  if (!cache[req.params.city] || cache[req.params.city].localCache === null) {
    let data = await fetch(url);
    cache[req.params.city] = {
      localCache: await data.json(),
      cacheTime: new Date().getTime(),
    };
  }

  return res.send(cache);
};

module.exports = {
  getCity,
};
