//Models
const News = require("../models/News");

//Create News
const createNews = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    if (await News.findOne({ title: title })) {
      return res.status(400).json({ error: "Notícia já existente!" });
    }

    if (!title || !description || !content) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const news = await News.create({
      title,
      description,
      content,
    });

    return res
      .status(201)
      .json({ message: "Notícia criada com sucesso!", news });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar notícia!" });
  }
};

//List News
const listNews = async (req, res) => {
  try {
    const news = await News.find();
    if (news.length === 0) {
      return res.status(400).json({ error: "Nenhuma notícia encontrada!" });
    }
    return res.status(200).json({ news, message: "Notícias listadas com sucesso!" });
  } catch (err) {
    return res.status(400).json({ error: "Erro ao listar notícias!" });
  }
};

//Update News
const updateNewsByTitle = async (req, res) => {
  try {
    const {title} = req.params;

    await News.findOneAndUpdate({title: title}, req.body);
    return res.status(200).json({ message: "Notícia atualizada com sucesso!" });
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar notícia!" });
  }
};

//Delete News
const deleteNewsByTitle = async (req, res) => {
  try {
    const {title} = req.params;
    const newsDeleted = await News.findOneAndDelete({ title: title });
    if (!newsDeleted) {
      return res.status(400).json({ error: "Notícia não encontrada!" });
    }
    return res.status(200).json({ message: `Notícia ${title} deletada com sucesso!` });
  } catch (err) {
    return res.status(400).json({ error: "Erro ao deletar notícia!" });
  }
};

const deleteAllNews = async (req, res) => {
  try {
    const deletedNews = await News.deleteMany();
    if (deletedNews.deletedCount === 0) {
      return res.status(400).json({ error: "Nenhuma notícia encontrada!" });
    }
    return res.status(200).json({ msg: "Todas as notícias foram deletadas!" });
  } catch (err) {
    return res.status(400).json({ error: "Erro ao deletar notícias!" });
  }
};

module.exports = {
  createNews,
  listNews,
  updateNewsByTitle,
  deleteNewsByTitle,
  deleteAllNews,
};
