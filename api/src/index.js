const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const sequelize = require('./configs/db.config');
const AuthMiddleware = require('./middlewares/auth.middleware');
const { accessLevels } = require('./configs/app.config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = sequelize;
db.sync()
    .then(result => console.log('Successfully synchronized with MySQL database!'))
    .catch(err => console.log('[SEQUELIZE ERROR]:', err));

app.use('/auth', authRoutes);

// TEST
app.get('/user', AuthMiddleware.withAuth, (req, res) => {
    res.status(200).json({ user: req.user });
});

app.get('/admin', AuthMiddleware.withAuth, AuthMiddleware.allowOnly(accessLevels.ADMIN), (req, res) => {
    res.status(200).json({ message: 'An access to the most secret info was given! System ADMIN password is... ʰᵃʰᵃ ˢᵗᵘᵖᶦᵈ ˢʰᶦᵗ ᵍᵒ ᶠᵘᶜᵏ ʸᵒᵘʳˢᵉˡᶠ' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
