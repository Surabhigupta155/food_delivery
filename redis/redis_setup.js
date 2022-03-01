const redis = require('redis')

const redis_port = process.env.PORT || 6379;

const client = redis.createClient(redis_port);

client.on("connect", function () {
    console.log("Connection Successful with redis!!");
});

client.on("error", (err) => {
    console.log('error occured',err);
});

module.exports = async function set_redis(token, value) {
    const r = client.setex(
        `token:${token}`, 540000, value, function (err) {
            console.log(err)
        }
    )
    console.log('value of r',r)
    console.log('value of value',value)
    let arr = ['abc', 'abc']
    return arr
}

module.exports = async function get_redis(token) {
    return new Promise((resolve, reject) => {
        client.get(`token:${token}`, function (err, value) {
            if (!value) resolve(null)
            else resolve(JSON.parse(value))
        })
    })
}