import path from 'path';
import { fileURLToPath } from 'url';

const getEntityLocation = (entity) => {
    // Get the file path of the current module
    const __filename = fileURLToPath(import.meta.url);
    console.log(__filename)
    // Get the directory path of the current module
    const __dirname = path.dirname(__filename);
    console.log(__dirname)
    // Resolve the root directory path by going up dynamically based on the directory structure
    let rootDirectory = __dirname;
    console.log("RD", rootDirectory)
    while (path.basename(rootDirectory) !== 'src') {
        rootDirectory = path.dirname(rootDirectory);
    }
    console.log("NRD", rootDirectory)
    return rootDirectory+'/database/'+`${entity}.json`;
};

getEntityLocation('users');
export {getEntityLocation}

