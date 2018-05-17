/**
 * Contains basic utility methods for file mannipulation.
 */

export const PATH_SEPARATOR = '/';

const RNFS = require('react-native-fs');

const ENCODING = 'utf8';

/**
 * Determines whether the input directory exists.
 *
 * @param directoryPath
 *     the name of the directory in question
 * @param isAbsolutePath
 *     the optional boolean flag indicating whether the input path is an absolute path
 * @return
 *     a Promise<boolean> object indicating whether the directory in question exists
 */
export const directoryExists = (directoryPath, isAbsolutePath = false) => {
    console.log('Determining if directory ' + directoryPath + ' exists.');

    if (!isAbsolutePath) {
        return RNFS.exists(getAbsolutePath(directoryPath));
    }

    return RNFS.exists(directoryPath);
}

/**
 * Creates a directory with the specified name.
 * This function waits until the directory has been craeted before returning to caller.
 *
 * @param directoryPath
 *     the path of the directory to be created
 * @param isAbsolutePath
 *     the optional boolean flag indicating whether the input path is an absolute path
 * @return
 *     a Promise<void> object after the directory has been created
 */
export const createDirectory = (directoryPath, isAbsolutePath = false) => {
    console.log('Creating directory ' + directoryPath);

    if (!isAbsolutePath) {
        return RNFS.mkdir(getAbsolutePath(directoryPath));
    }

    return RNFS.mkdir(directoryPath);
}

/**
 * Retrieves the list of files in the input directory.
 *
 * @param directoryPath
 *     the name of the directory to search
 * @param isAbsolutePath
 *     the optional boolean flag indicating whether the input path is an absolute path
 * @return
 *     a Promise<ReadDirItem[]> array containing file metadata
 */
export const getFileList = (directoryPath, isAbsolutePath = false) => {
    if (!isAbsolutePath) {
        return RNFS.readDir(getAbsolutePath(directoryPath));
    }

    return RNFS.readDir(directoryPath);
}

/**
 * Persists the specified content to a file.
 *
 * @param filePath
 *     the path to the file to write
 * @param isAbsolutePath
 *     the optional boolean flag indicating whether the input path is an absolute path
 * @param content
 *     the content to be written to the file
 */
export const writeToFile = (filePath, content, isAbsolutePath = false) => {
    console.log('Writing to file ' + filePath);

    if (!isAbsolutePath) {
        return RNFS.writeFile(getAbsolutePath(filePath), content, ENCODING);
    }

    return RNFS.writeFile(filePath, content, ENCODING);
}

/**
 * Gets the status of the input file, which includes creation date, file size, etc.
 *
 * @param filePath
 *     the path to the file in question
 * @param isAbsolutePath
 *     the optional boolean flag indicating whether the input path is an absolute path
 * @return
 *     a Promise<StatResult> object containing the file status
 */
export const getFileStatus = (filePath, isAbsolutePath = false) => {
    if (!isAbsolutePath) {
        return RNFS.stat(getAbsolutePath(filePath), ENCODING);
    }

    return RNFS.stat(filePath, ENCODING);
}

/**
 * Reads from a file.
 *
 * @param filePath
 *     the path to the file to read
 * @param isAbsolutePath
 *     the optional boolean flag indicating whether the input path is an absolute path
 * @return
 *     a Promise<string> object containing the content of the file
 */
export const readFromFile = (filePath, isAbsolutePath = false) => {
    if (!isAbsolutePath) {
        return RNFS.readFile(getAbsolutePath(filePath), ENCODING);
    }

    return RNFS.readFile(filePath, ENCODING);
}

/**
 * Deletes a file from the device.
 *
 * @param filePath
 *     the path of the file to be deleted
 * @param isAbsolutePath
 *     the optional boolean flag indicating whether the input path is an absolute path
 */
export const deleteFile = (filePath, isAbsolutePath = false) => {
    if (!isAbsolutePath) {
        return RNFS.unlink(getAbsolutePath(filePath), ENCODING);
    }

    return RNFS.unlink(filePath);
}

/**
 * Prepends the input path with the document directory on the mobile device.
 *
 * @param inputPath
 *     the input path relative to the document directory
 * @return
 *     the resulting absolute path
 */
const getAbsolutePath = (inputPath) => {
    return RNFS.ExternalStorageDirectoryPath + PATH_SEPARATOR + inputPath;
}