const express = require('express');
const cors = require('cors');
const app = express();
const formRoutes = require('./routes/form');

app.use(cors());
app.use(express.json());
app.use('/form', formRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
