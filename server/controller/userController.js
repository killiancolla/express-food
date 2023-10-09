import User from "../models/User.js";
import { generateToken } from "./../auth/authentification.js";
import bcrypt from "bcryptjs";

export default {
  /**
   * Récupération de tous les utilisateurs
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ flag: 1 });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération de l'utilisateur selon l'id passé dans l'url
   */
  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Vérifie le couple de l'adresse mail et du mot de passe
   * >* S'il trouve alors ça retourne un json
   * >* Sinon erreur 404 ou 500
   */
  getUserByMail: async (req, res) => {
    const { mail } = req.params;
    console.log(mail, req.body.password);
    try {
      const users = await User.findOne({
        mail: { $regex: mail, $options: "i" },
      });
      if (!users) {
        return res.status(404).json({ error: "User not found" });
      }
      if (bcrypt.compareSync(req.body.password, users.password)) {
        res.send({
          _id: users._id,
          name: users.name,
          firstname: users.firstname,
          mail: users.mail,
          role: users.role,
          flag: users.flag,
          token: generateToken(users),
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Création de l'utilisateur
   */
  createUser: async (req, res) => {
    const { name, firstname, mail, password, role } = req.body.data;
    console.log(req.body);
    const newUser = new User({
      name: name,
      firstname: firstname,
      mail: mail,
      password: bcrypt.hashSync(password),
      role: role,
    });
    console.log(newUser);
    try {
      const existUser = await User.find({
        mail: { $regex: mail, $options: "i" },
      });
      if (existUser.length > 0) {
        return res.status(409).json({ error: "User already exists" });
      }
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        firstname: user.firstname,
        mail: user.mail,
        password: user.password,
        flag: user.flag,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Modification des données de l'utilisateur selon son id
   */
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, firstname, mail, password, role } = req.body.data;
    try {
      const user = await User.findById(id);
      user.name = name || user.name;
      user.firstname = firstname || user.firstname;
      user.mail = mail || user.mail;
      if (password === "" || password === undefined) {
        user.password = user.password;
      } else {
        console.log(password);
        user.password = bcrypt.hashSync(password);
      }
      user.flag = user.flag;
      user.role = role || user.role;

      const updatedUser = await user.save();
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        firstname: updatedUser.firstname,
        mail: updatedUser.mail,
        password: updatedUser.password,
        flag: updatedUser.flag,
        role: updatedUser.role,
        token: generateToken(updatedUser),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression de l'utilisateur selon son id
   */
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      user.flag = 0;

      const updatedUser = await user.save();
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
