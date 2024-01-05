import fsPromises from 'fs/promises';
import path from 'path';

const raceResultsPath = path.join(process.cwd(), 'src/dataStorage/raceResults.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Process the request using the req parameter
    const jsonData = await fsPromises.readFile(raceResultsPath);
    const objectData = JSON.parse(jsonData);
    res.status(200).json(objectData);
  } else if (req.method === 'POST') {
    try {
      // Read the existing data from the JSON file
      const jsonData = await fsPromises.readFile(raceResultsPath);
      const objectData = JSON.parse(jsonData);

      // Add the new data to the object
      const {raceId, raceName, raceDate, raceStartTime, results} = req.body;

      const newData = {
        raceId, raceName, raceDate, raceStartTime, results
      }
      
      objectData.push(newData);

      // Convert the object back to a JSON string
      const updatedData = JSON.stringify(objectData);

      // Write the updated data to the JSON file
      await fsPromises.writeFile(raceResultsPath, updatedData);

      // Send a success response
      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      console.error(error);
      // Send an error response
      res.status(500).json({ message: 'Error storing data' });
    }
  }
}
