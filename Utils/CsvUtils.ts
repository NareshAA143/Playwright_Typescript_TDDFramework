import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class CsvUtils {
  static readCsv(filePath: string) {
    const fullPath = path.resolve(filePath);
    const fileContent = fs.readFileSync(fullPath);

    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  }
}
