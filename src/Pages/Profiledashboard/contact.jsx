import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: '',
    category: 'technical',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/students/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { firstName, lastName } = res.data.data;
        setForm((prev) => ({ ...prev, name: `${firstName} ${lastName}` }));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://lms-backend-flwq.onrender.com/api/v1/students/support',
        {
          subject: form.subject,
          message: form.message,
          category: form.category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMsg('Support ticket submitted successfully.');
      setForm((prev) => ({ ...prev, subject: '', message: '', category: 'technical' }));
    } catch (error) {
      setErrorMsg('Failed to submit the ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 max-w-3xl mx-auto mt-4 sm:mt-8 w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Contact Support</h2>

      {successMsg && <p className="text-green-600 text-sm mb-3 text-center">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            disabled
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed text-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="general">General</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
