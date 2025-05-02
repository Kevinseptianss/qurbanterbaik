'use client';

import { useState } from 'react';

export default function CSVImportPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [importedItems, setImportedItems] = useState(0);
  const [failedItems, setFailedItems] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Basic validation
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size exceeds 5MB limit');
        return;
      }
      
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }

      setFile(selectedFile);
      setSuccess(false);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);
    setFailedItems(0);

    try {
      // Estimate total items
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const estimatedTotal = Math.max(0, lines.length - 1);
      setTotalItems(estimatedTotal);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Import failed');
      }

      // Update progress and results
      setTotalItems(data.totalItems);
      setImportedItems(data.successfulCount || data.importedItems);
      setFailedItems(data.failedCount || 0);
      setProgress(100);
      setSuccess(true);

    } catch (err) {
      console.error('Import failed:', err);
      setError(err.message || 'Failed to import data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">CSV to Firestore Importer</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            disabled={isLoading}
          />
        </div>

        {file && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Selected file: {file.name} ({Math.round(file.size / 1024)} KB)
            </p>
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={!file || isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!file || isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Importing...
            </span>
          ) : 'Import to Firestore'}
        </button>

        {isLoading && (
          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-blue-700">Progress</span>
              <span className="text-sm font-medium text-blue-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Processed {importedItems + failedItems} of {totalItems} items
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p className="text-sm font-medium text-green-700">
              Successfully imported {importedItems} items to Firestore!
              {failedItems > 0 && (
                <span className="block mt-1 text-yellow-700">
                  {failedItems} items failed to import
                </span>
              )}
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">CSV Format Requirements</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>First row should contain headers/column names</li>
            <li>Each column will become a field in Firestore</li>
            <li>Supported formats: .csv (max 5MB)</li>
            <li>Empty rows will be automatically skipped</li>
          </ul>
        </div>
      </div>
    </div>
  );
}