const axios = require('axios');
const Dev = require('../model/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: leggedDev._id } },
                { _id: { $nin: leggedDev.likes } },
                { _id: { $ne: leggedDev.dislikes } }
            ]
        });

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar} = response.data;

        const novoUser = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar
        });

        return res.json(novoUser);
    }
};