import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    education: '',
    occupation: '',
    skills: '',
    interests: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('dashboard_refreshed');
    if (!hasRefreshed) {
      sessionStorage.setItem('dashboard_refreshed', 'true');
      window.location.reload();
      return;
    }

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please log in to view your profile.');
        setStudent({
          firstName: 'User',
          lastName: '',
          email: '',
          avatar: 'default_avatar.jpg',
          phone: '',
        });
        return;
      }

      try {
        const res = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setStudent(data);
        setFormData({
          education: data.education || '',
          occupation: data.occupation || '',
          skills: data.skills?.join(', ') || '',
          interests: data.interests?.join(', ') || '',
        });
      } catch (err) {
        setMessage('Failed to load profile data.');
        setStudent({
          firstName: 'User',
          lastName: '',
          email: 'N/A',
          avatar: 'default_avatar.jpg',
          phone: 'N/A',
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please log in to update your profile.');
        return;
      }

      const payload = {
        education: formData.education,
        occupation: formData.occupation,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        interests: formData.interests.split(',').map(interest => interest.trim()),
      };

      await axios.put('https://lms-backend-flwq.onrender.com/api/v1/students/profile', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <div className="h-24 sm:h-28 w-full rounded-xl mb-10 bg-gradient-to-r from-blue-200 to-yellow-100"></div>

      {message && (
        <p className={`text-${message.includes('successfully') ? 'green' : 'red'}-500 mb-4 text-sm`}>
          {message}
        </p>
      )}

      {student && (
        <>
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-4 -mt-20 sm:ml-4 text-center sm:text-left">
              <img
                src={`https://lms-backend-flwq.onrender.com/uploads/${student.avatar}`}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow object-cover"
                onError={(e) =>
                  (e.target.src = 'https://lms-backend-flwq.onrender.com/uploads/default_avatar.jpg')
                }
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-gray-500 text-sm">{student.email || 'No email available'}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:mr-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto">
                Edit
              </button>
            </div>
          </div>

          {/* Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Read-only */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Full Name</label>
              <input
                type="text"
                value={`${student.firstName} ${student.lastName}`.trim() || 'N/A'}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Email</label>
              <input
                type="text"
                value={student.email || 'N/A'}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Phone</label>
              <input
                type="text"
                value={student.phone || 'N/A'}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
              />
            </div>

            {/* Editable */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Interests (comma-separated)</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {message && (
              <p className={`mt-2 text-sm text-${message.includes('successfully') ? 'green' : 'red'}-600`}>
                {message}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
