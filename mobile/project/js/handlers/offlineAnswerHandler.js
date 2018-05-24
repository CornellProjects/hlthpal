import {
        createDirectory,
        deleteFile,
        directoryExists,
        getFileList,
        getFileStatus,
        readFromFile,
        writeToFile,
        PATH_SEPARATOR
        } from './fileHandler';


/**
 * Directory used to store offline records
 */
const DIRECTORY = 'HlthPal';

/**
 * Prefix of the name of the file used to store a record
 */
const FILE_PREFIX = 'HlthPal_record_';

/**
 * File extension
 */
const FILE_EXTENSION = '.txt';

/**
 * Provides functionality for persisting and retrieving offline records.
 */
export default class OfflineAnswerHandler {

    /**
     * Persists the record on the device's local storage.
     * Each record is first serialized into a JSON string and then saved to a file.
     *
     * @param record
     *     the record to persist
     */
    saveRecord(record) {
        console.log('Persisting record to local storage.');
        const result = getRecordFileName();
        const filePath = result.path;
        const timestamp = result.time;

        const recordToPersist = {
            answers : record.answers,
            symptoms : record.symptoms,
            score : record.score,
            created_date: timestamp
        };

        const serializedRecord = JSON.stringify(recordToPersist);



        directoryExists(DIRECTORY)
            .then((exists) => {
                if (exists) {
                    console.log('Directory ' + DIRECTORY + ' already exists.');
                    writeToFile(filePath, serializedRecord);
                } else {
                    console.log('Creating directory ', DIRECTORY);
                    createDirectory(DIRECTORY)
                        .then(() => {
                            writeToFile(filePath, serializedRecord);
                        });
                }
            });
    }

    /**
     * Goes through each and every answers that were saved offline and apply the callback funtion.
     *
     * @param callback
     *     the callback function to execute on each offline record
     */
    retrieveOfflineRecords(callback) {
        if (!callback) {
            throw 'The callback function cannot be undefined.';
        }

        directoryExists(DIRECTORY)
            .then((exists) => {
                if (exists) {
                    getFileList(DIRECTORY)
                        .then((fileMetadataList) =>
                            executeCallback(fileMetadataList, callback));
                } else {
                    console.log('No offline records exist. Nothing to do.');
                }
            });
    }

    /**
     * Deletes all offline records saved on the device.
     */
     deleteOfflineRecords() {
        console.log('Deleting offline records.');

        directoryExists(DIRECTORY)
            .then((exists) => {
                if (exists) {
                    getFileList(DIRECTORY)
                        .then((fileMetadataList) =>
                            deleteAllRecordFiles(fileMetadataList));
                } else {
                    console.log('Attempting to clean up offline records ' +
                        'but the main directory ' + DIRECTORY + ' does not exist.');
                }
            });
     }

}

/**
 * Loops through each saved record and executes the callback function.
 *
 * @param fileMetadataList
 *     the list of file metadata
 * @param callback
 *     the callback function to execute on each record
 */
const executeCallback = (fileMetadataList, callback) => {
    fileMetadataList.forEach(function(fileMetadata) {
        const filePath = fileMetadata.path;
        getFileStatus(filePath, true)
            .then((fileStatus) => {
                if (fileStatus.isFile()) {
                    readFromFile(filePath, true)
                        .then((record) => {
                            console.log('Processing file ' + filePath);
                            callback(record);
                        });
                }
            });
    });
}

/**
 * Loops through each saved record and deletes it from the device.
 */
const deleteAllRecordFiles = (fileMetadataList) => {
    fileMetadataList.forEach(function(fileMetadata) {
        const filePath = fileMetadata.path;
        getFileStatus(filePath, true)
            .then((fileStatus) => {
                if (fileStatus.isFile()) {
                    console.log('Deleting file ' + filePath);
                    deleteFile(filePath, true)
                        .then(() => {
                            console.log(filePath + ' has been successfully deleted.');
                        });
                }
            });
    });
}

/**
 * Generates a universally unique name for the file used to store the record.
 *
 * @return
 *     the generated file name
 */
const getRecordFileName = () => {
    const currentTime = new Date();
    return {
        'path': DIRECTORY + PATH_SEPARATOR + FILE_PREFIX + currentTime.getTime() + FILE_EXTENSION,
        'time': currentTime.getTime()
    }
}