const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/project1';

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function migrate() {
    try {
        console.log('Aplicando migration');

        const usersData = [
            { name: "Amanda", email: "amanda@gmail.com", password: "password123", level: 1 },
            { name: "Bruno", email: "bruno2@gmail.com", password: "password321", level: 1 },
            { name: "Carlos", email: "carlos@gmail.com", password: "password123", level: 1 },
            { name: "Diana", email: "diana@gmail.com", password: "password123", level: 1 },
            { name: "Eva", email: "eva@gmail.com", password: "password123", level: 1 },
            { name: "Fabio", email: "fabio@gmail.com", password: "password123", level: 2 },
            { name: "Gina", email: "gina@gmail.com", password: "password123", level: 2 },
            { name: "Hugo", email: "hugo@gmail.com", password: "password123", level: 2 },
            { name: "Iris", email: "iris@gmail.com", password: "password123", level: 2 },
            { name: "Jason", email: "jason@gmail.com", password: "password123", level: 2 },
            { name: "Karen", email: "karen@gmail.com", password: "password123", level: 3 },
            { name: "Leo", email: "leo@gmail.com", password: "password123", level: 3 },
            { name: "Mia", email: "mia@gmail.com", password: "password123", level: 3 },
            { name: "Nico", email: "nico@gmail.com", password: "password123", level: 3 },
            { name: "Olga", email: "olga@gmail.com", password: "password123", level: 3 },
            { name: "Paula", email: "paula@gmail.com", password: "password123", level: 4 },
            { name: "Quinn", email: "quinn@gmail.com", password: "password123", level: 4 },
            { name: "Rosa", email: "rosa@gmail.com", password: "password123", level: 4 },
            { name: "Sam", email: "sam@gmail.com", password: "password123", level: 4 },
            { name: "Tina", email: "tina@gmail.com", password: "password123", level: 4 },
            { name: "Uma", email: "uma@gmail.com", password: "password123", level: 5 },
            { name: "Vic", email: "vic@gmail.com", password: "password123", level: 5 },
            { name: "Wendy", email: "wendy@gmail.com", password: "password123", level: 5 },
            { name: "Xander", email: "xander@gmail.com", password: "password123", level: 5 },
            { name: "Yara", email: "yara@gmail.com", password: "password123", level: 5 }
        ];

        await User.deleteMany({});

        for (const userData of usersData) {
            const hashedPassword = await bcrypt.hash(userData.password, 10); 
            const user = new User({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                level: userData.level
            });
            await user.save();
        }

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        mongoose.connection.close();
    }
}

migrate();
