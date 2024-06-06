import jsonfile from 'jsonfile';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { getEntityLocation } from '../helpers/databaseEntityLocator.js';
const keyOrder = ['id', 'username', 'password', 'email', 'firstName', 'lastName', 'createdAt'];

const userDAO = {
        readUsers() {
        try {
            return jsonfile.readFileSync(getEntityLocation('users'));
        } catch (error) {
            return new Error("Error reading users.")
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
    },
    findUserByUsername(username){
        const users=this.readUsers();
        const user=users.find(user=>user.username===username);
        if (user){
            return user;
        }
        return null;
    },
    createUser(newUser) {
        try {
            const usersFilePath = getEntityLocation('users');
            if(this.findUserByUsername(newUser.username)){
            return new Error("User already exists!")
                }
            const sortedUser = {};
            newUser.id = uuidv4(); // Generate UUID for new user
            newUser.createdAt = new Date().toISOString(); // Set createdAt timestamp
            keyOrder.forEach(key => {
                if (newUser.hasOwnProperty(key)) {
                    sortedUser[key] = newUser[key];
                }
            });
  
            const newUserString = JSON.stringify(sortedUser);

    
            if (fs.existsSync(usersFilePath)) {
                let existingContent = fs.readFileSync(usersFilePath, 'utf8');
             if (existingContent.endsWith(']')) {
                    existingContent = existingContent.slice(0, -1);
                }

                // Append the new user object to the existing content
                const updatedContent = existingContent + (existingContent.endsWith('[') ? '' : ',\n') + newUserString;

                // Write the updated content back to the file
                fs.writeFileSync(usersFilePath, updatedContent + ']', 'utf8');
            } else {
                // If the file doesn't exist, create a new file with the new user object
                fs.writeFileSync(usersFilePath, `[${newUserString}]`, 'utf8');
            }

            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

};
export {userDAO};
