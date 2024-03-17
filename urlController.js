const UrlInMongo = require("./../models/urlModel");

function isValidUrl(url) {
  const regex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regex.test(url);
}

async function isExist(long) {
  const res = await UrlInMongo.findOne({ long_url: long });

  console.log("Result from is Exist:", res);

  if (res) {
    return true;
  } else return false;
}

function to_base_62() {
  let currentTime_unique = new Date().getTime(); // Unique number
  console.log(currentTime_unique);
  let hash_str, s;
  s = "012345689abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  hash_str = "";

  while (currentTime_unique > 0) {
    let b = parseInt(currentTime_unique % 62);
    let a = s[b] ? s[b] : "";
    hash_str = hash_str + a;
    currentTime_unique = parseInt(currentTime_unique / 62);
    console.log("b", b, "a", a, "currentTime_unique", currentTime_unique);
  }
  const shortURL = `http://short.tu/${hash_str}`;

  return { shortURL, hash_str };
}

function saveToDataBase(data) {
  data
    .save()
    .then((doc) => {
      console.log(doc);
      return true;
    })
    .catch((err) => {
      console.error(`ERROR 😀: ${err}`);
      return err;
    });
}

// Function to shorten a URL
async function shortenURL(longUrl) {
  if (!isValidUrl(longUrl)) {
    return "Not a valid URL";
  }
  if (await isExist(longUrl)) {
    return "Error: Already exist.";
  }

  const { shortURL } = to_base_62();
  const data = new UrlInMongo({
    short_url: shortURL,
    long_url: longUrl,
  });

  saveToDataBase(data);

  return shortURL; // send back the short URL
}

async function getLongByShort(short) {
  const result = await UrlInMongo.findOne({ short_url: short });
  if (result) {
    return result.long_url;
  } else {
    return null;
  }
}

async function getLongById(id) {
  const short = `http://short.tu/${id}`;
  return await getLongByShort(short);
}

module.exports = { getLongByShort, getLongById, shortenURL };
