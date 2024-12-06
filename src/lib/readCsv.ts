import { FieldEnumMapping } from '@/types';
import csv from 'csv-parser';
import * as fs from 'fs';

function splitFieldIfNeeded(
  row: Record<string, string | string[]>,
  fieldsToSplit: string[],
) {
  fieldsToSplit.forEach((field) => {
    if (typeof row[field] === 'string') {
      const value = row[field].trim();

      if (value === '') {
        row[field] = [];
      } else if (value.includes(';')) {
        row[field] = value.split(';').map((item: string) => item.trim());
      } else {
        row[field] = [value];
      }
    }
  });
}

export async function readCsv<T, K = null>(
  filePath: string,
  fieldsToSplit: string[] = [],
  enumMapping: FieldEnumMapping<T, K> = {},
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        splitFieldIfNeeded(row, fieldsToSplit);

        Object.keys(enumMapping).forEach((key) => {
          const fieldName = key as keyof T;
          const fieldMapping = enumMapping[fieldName];

          if (fieldMapping && row[fieldName] != null) {
            const fieldValue = Array.isArray(row[fieldName])
              ? (row[fieldName] as string[])[0]?.toString()
              : row[fieldName].toString();

            const mappedEnumValue = fieldValue
              ? fieldMapping[fieldValue.trim()]
              : undefined;

            if (mappedEnumValue !== undefined) {
              row[fieldName] = mappedEnumValue;
            }
          }
        });

        results.push(row as T);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(`Error reading CSV file: ${err.message}`);
      });
  });
}
