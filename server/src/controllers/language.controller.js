import { getConnection } from "./../database/database";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, title, content FROM blogs");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, title, content FROM blogs WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (title === undefined || content === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const blogs = { title, content };
        const connection = await getConnection();
        await connection.query("INSERT INTO blogs SET ?", blogs);
        res.json({ message: "Register added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (id === undefined || title === undefined || content === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const blogs = { title, content };
        const connection = await getConnection();
        const result = await connection.query("UPDATE blogs SET ? WHERE id = ?", [blogs, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM blogs WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLanguages,
    getLanguage,
    addLanguage,
    updateLanguage,
    deleteLanguage
};
