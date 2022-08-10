module.exports = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}