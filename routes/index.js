const express = require("express");

const routes = express.Router();
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const { validateUserData, validateMovieData } = require("../middlewares/validators");

routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);




// Создайте роуты и контроллеры
// В API должно быть 5 роутов:
// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
// Создайте контроллер для каждого роута. Защитите роуты авторизацией: если клиент не прислал JWT, доступ к роутам ему должен быть закрыт.