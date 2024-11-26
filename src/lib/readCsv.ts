import { parse } from 'csv-parse';
import { promises as fs } from 'fs';

export async function parseCsv<T>(
  content: string,
  columns: string[],
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    parse(content, { delimiter: ',', columns }, (err, result: T[]) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export async function readCsv<T>(
  filePath: string,
  columns: string[],
): Promise<T[]> {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return parseCsv<T>(fileContent, columns);
}
