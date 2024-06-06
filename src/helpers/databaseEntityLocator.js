import path from 'path';
import { fileURLToPath } from 'url';

const getEntityLocation = (entity) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let rootDirectory = __dirname;
    console.log("RD", rootDirectory)
    while (path.basename(rootDirectory) !== 'src') {
        rootDirectory = path.dirname(rootDirectory);
    }
    return rootDirectory+'/database/'+`${entity}.json`;
};

getEntityLocation('users');
export {getEntityLocation}

