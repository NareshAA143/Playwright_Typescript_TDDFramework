import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class CsvUtils {

  /**
   * Reads a CSV file and returns an array of objects.
   * Each object represents a row, with headers as keys.
   */
  private static readCsv(filePath: string): any[] {
    // Convert relative path to absolute path, works cross-platform
    const absolutePath = path.resolve(__dirname, '..', filePath);

    // Check if the file exists
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`CSV file not found at path: ${absolutePath}`);
    }

    // Read the file content as UTF-8 string and remove BOM if present
    const fileContent = fs.readFileSync(absolutePath, 'utf-8').replace(/^\uFEFF/, '');

    // Parse CSV content into objects
    return parse(fileContent, {
      columns: true,      // Use the first row as object keys (headers)
      skip_empty_lines: true, // Ignore empty rows
      trim: true,         // Remove spaces from values
    });
  }

  /**
   * Fetch a CSV record by QEID (case-insensitive)
   * @param qeIdValue - The QEID value to search for
   * @param filePath - Path to the CSV file
   * @returns The matched record as an object
   */
  static getDataByQEID(qeIdValue: string, filePath: string): any {
    // Get all records from CSV
    const records = this.readCsv(filePath);

    // Find the record where the QEID column matches qeIdValue
    const matchedRecord = records.find((record: any) => {
      // Check all keys in the row, because CSV headers might have quotes or spaces
      return Object.keys(record).some((key) => {
        // Normalize key:
        // 1. Remove surrounding quotes (e.g., '"QEID"' → 'QEID')
        // 2. Trim spaces
        // 3. Convert to lowercase for case-insensitive comparison
        const normalizedKey = key.replace(/^['"]|['"]$/g, '').trim().toLowerCase();

        // Check if this is the QEID column and the value matches qeIdValue
        return (
          normalizedKey === 'qeid' &&
          record[key].trim().toLowerCase() === qeIdValue.trim().toLowerCase()
        );
      });
    });

    // If no matching record is found, log CSV for debugging and throw an error
    if (!matchedRecord) {
      console.log('CSV Records:', records);
      console.log('Looking for QEID:', qeIdValue);
      throw new Error(
        `No data found for QEID = ${qeIdValue} in file: ${filePath}`
      );
    }

    // Return the matched record
    return matchedRecord;
  }
}
