import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { db } from '@/firebase/configure';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // Parse CSV file
    const csvText = await file.text();
    const { data, errors } = await new Promise(resolve => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results),
        error: (error) => resolve({ data: [], errors: [error] })
      });
    });

    if (errors.length > 0) {
      throw new Error('CSV parsing error: ' + errors[0].message);
    }

    // Process in batches
    const BATCH_SIZE = 500;
    let successfulCount = 0;
    const failedItems = [];

    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.allSettled(
        batch.map(item => 
          db.collection('items').add({
            ...cleanObject(item),
            importedAt: new Date().toISOString()
          })
        )
      );

      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successfulCount++;
        } else {
          failedItems.push({
            item: batch[index],
            error: result.reason.message
          });
        }
      });
    }

    return NextResponse.json({
      message: 'Import completed',
      totalItems: data.length,
      successfulCount,
      failedCount: failedItems.length,
      ...(failedItems.length > 0 && { failedItems })
    });

  } catch (error) {
    console.error('Import failed:', error);
    return NextResponse.json(
      { 
        message: 'Import failed',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper function to clean object values
function cleanObject(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .map(([k, v]) => [k.trim(), typeof v === 'string' ? v.trim() : v])
  );
}