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
        return users.find(user => user.username === username && user.password === password);
    }
};

export {userDAO};
