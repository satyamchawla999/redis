const axios = require("axios");

module.exports.fetchApiData = async (species) => {
    const apiResponse = await axios.get(
        `https://www.fishwatch.gov/api/species/${species}`
    );

    console.log("Request sent to the API");
    return apiResponse.data;
}