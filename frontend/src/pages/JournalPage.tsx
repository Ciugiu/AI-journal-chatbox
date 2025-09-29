import React, { useState } from 'react';
import { journalAPI } from '../api';

const JournalPage: React.FC = () => {
  const [entryText, setEntryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!entryText.trim()) {
      setError('Please write something in your journal entry');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setAiResponse('');

    try {
      const response = await journalAPI.createEntry(entryText);
      const { entry } = response.data;
      
      setSuccess('Journal entry saved successfully!');
      setAiResponse(entry.ai_response);
      setEntryText(''); // Clear the form
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save journal entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Write Journal Entry</h1>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="form-container" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="entry">What's on your mind today?</label>
            <textarea
              id="entry"
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              placeholder="Share your thoughts, feelings, experiences, or anything you'd like to reflect on..."
              disabled={loading}
              style={{ minHeight: '200px' }}
            />
          </div>

          <button type="submit" className="btn" disabled={loading || !entryText.trim()}>
            {loading ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px', display: 'inline-block', marginRight: '8px' }}></div>
                Getting AI Response...
              </>
            ) : (
              'Save Entry & Get AI Response'
            )}
          </button>
        </form>
      </div>

      {aiResponse && (
        <div className="journal-entry" style={{ maxWidth: '600px', margin: '2rem auto 0' }}>
          <div className="ai-response">
            <div className="ai-response-label">AI Assistant Response:</div>
            <div className="ai-response-text">{aiResponse}</div>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default JournalPage;