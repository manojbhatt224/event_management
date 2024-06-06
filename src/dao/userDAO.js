import jsonfile from 'jsonfile';
import { getEntityLocation } from '../helpers/databaseEntityLocator.js';

const userDAO = {
    readUsers() {
        try {
            return jsonfile.readFileSync(getEntityLocation('users'));
        } catch (error) {
            console.error('Error reading users:', error);
            return [];
        }
    },

    findUserByUsernameAndPassword(username, password) {
        const users = this.readUsers();
        const user=users.find(user => user.username === username && user.password === password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }
};

export {userDAO};
