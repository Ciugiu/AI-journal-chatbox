import React, { useState, useEffect } from 'react';
import { journalAPI } from '../api';
import { JournalEntry } from '../types/index.js';

const EntriesPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await journalAPI.getEntries();
      setEntries(response.data.entries);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch journal entries');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your journal entries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button 
          onClick={fetchEntries} 
          className="btn"
          style={{ maxWidth: '200px', margin: '1rem auto' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Journal Entries</h1>
      
      {entries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>You haven't written any journal entries yet.</p>
          <p>
            <a href="/journal" style={{ color: '#4CAF50', textDecoration: 'none' }}>
              Write your first entry →
            </a>
          </p>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            You have {entries.length} journal {entries.length === 1 ? 'entry' : 'entries'}
          </p>
          
          {entries.map((entry) => (
            <div key={entry.id} className="journal-entry">
              <div className="journal-entry-header">
                <h3>Journal Entry #{entry.id}</h3>
                <span className="journal-entry-date">
                  {formatDate(entry.created_at)}
                </span>
              </div>
              
              <div className="journal-entry-text">
                <strong>Your Entry:</strong>
                <p style={{ marginTop: '0.5rem' }}>{entry.entry_text}</p>
              </div>
              
              {entry.ai_response && (
                <div className="ai-response">
                  <div className="ai-response-label">AI Assistant Response:</div>
                  <div className="ai-response-text">{entry.ai_response}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntriesPage;