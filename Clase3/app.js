const express = require('express');
const crypto = require('crypto');
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./Schema/movie');


const movies = require('./movies.json');



const app = express();
app.disable('x-powered-by');

app.use(express.json());
// Esto le da que si a todo usando *
app.use(cors())

// De esta forma controla mejor los parametros
app.use(cors({
    origin: (origin, callback)=>{
        const ACCEPTED_ORIGINS = ['http://127.0.0.1:5500', 'http://127.0.0.1:5500/'];

        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }
    }
}))


app.get('/movies', (req, res) => {
    const { genre } = req.query;
    if (genre) {
        filteredMovies = movies.filter(movie => movie.genre === genre);
        return res.json(filteredMovies);
    }
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id == id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).end('Error 404: Movie not found');
    }
});

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);
    if (result.error) {
        return res.status(400).json({ error: result.error.details });
    }
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.value,
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.details });
    }
    const { id } = req.params;
    const indexMovie = movies.findIndex(i => i.id == id);

    if (indexMovie < 0) {
        return res.status(404).json({ error: "Movie not found" });
    }

    const movie = {
        ...movies[indexMovie],
        ...result.value,
    };

    movies[indexMovie] = movie;

    return res.status(200).json(movie);
});

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id == id);

    if (movieIndex < 0) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    const deletedMovie = movies.splice(movieIndex, 1)[0];
    res.status(200).json(deletedMovie);
});

app.use((req, res) => {
    res.status(404).json({ error: "404" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server listening on port: http://localhost:' + PORT);
});
