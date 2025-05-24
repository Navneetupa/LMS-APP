import { useEffect, useState } from 'react';
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
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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
          avatar: 'default_profile.jpg',
          phone: '',
        });
        return;
      }

      try {
        const res = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setStudent({
          ...data,
          avatar: data.avatar || 'default_profile.jpg',
        });
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
          avatar: 'default_profile.jpg',
          phone: 'N/A',
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage('Please select an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size must be less than 5MB.');
        return;
      }
      setAvatarFile(file);
      setMessage('');
    }
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = 'YOUR_CLOUDINARY_CLOUD_NAME';
    const uploadPreset = 'YOUR_UPLOAD_PRESET';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      return res.data.secure_url;
    } catch (err) {
      throw new Error('Failed to upload image to Cloudinary.');
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please log in to update your profile.');
        setSaving(false);
        return;
      }

      let avatarUrl = student.avatar;
      if (avatarFile) {
        avatarUrl = await uploadToCloudinary(avatarFile);
      }

      const payload = {
        education: formData.education,
        occupation: formData.occupation,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
        interests: formData.interests.split(',').map((interest) => interest.trim()),
        avatar: avatarUrl !== 'default_profile.jpg' ? avatarUrl : undefined,
      };

      await axios.put('https://lms-backend-flwq.onrender.com/api/v1/students/profile', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudent((prev) => ({ ...prev, avatar: avatarUrl }));
      setMessage('Profile updated successfully!');
      setAvatarFile(null);
      setIsEditing(false);
    } catch (err) {
      setMessage(`Failed to update profile: ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setMessage('');
    setAvatarFile(null);
  };

  return (
    <div className="bg-white rounded-xl h-fit shadow !pt-20 p-4 sm:p-6 w-full ">
      <div className="h-24 sm:h-28 w-full rounded-xl mb-10 bg-gradient-to-r from-blue-200 to-yellow-100"></div>

      {message && (
        <p className={`text-${message.includes('successfully') ? 'green' : 'red'}-500 mb-4 text-sm text-center`}>
          {message}
        </p>
      )}

      {student && (
        <>
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 -mt-20 sm:-mt-16 sm:ml-4 text-center sm:text-left">
              <div className="relative">
                <img
                  src={student.avatar === 'default_profile.jpg' ? '/default_profile.jpg' : student.avatar}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow object-cover"
                  onError={(e) => (e.target.src = '/default_profile.jpg')}
                />
                {isEditing && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 sm:p-2.5 cursor-pointer hover:bg-blue-600 transition"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-3-3v6"
                      ></path>
                    </svg>
                  </label>
                )}
                {isEditing && (
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                )}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm">{student.email || 'No email available'}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:mr-4">
              <button
                onClick={toggleEditMode}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {/* Read-only Fields */}
            <div>
              <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Full Name</label>
              <input
                type="text"
                value={`${student.firstName} ${student.lastName}`.trim() || 'N/A'}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Email</label>
              <input
                type="text"
                value={student.email || 'N/A'}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Phone</label>
              <input
                type="text"
                value={student.phone || 'N/A'}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-xs sm:text-sm"
              />
            </div>

            {/* Editable Fields (shown only in edit mode) */}
            {isEditing && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Education</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Interests (comma-separated)</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
              </>
            )}
          </div>

          {/* Display read-only values when not in edit mode */}
          {!isEditing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
              <div>
                <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Education</label>
                <input
                  type="text"
                  value={formData.education || 'N/A'}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Occupation</label>
                <input
                  type="text"
                  value={formData.occupation || 'N/A'}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Skills</label>
                <input
                  type="text"
                  value={formData.skills || 'N/A'}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Interests</label>
                <input
                  type="text"
                  value={formData.interests || 'N/A'}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* Save Button (shown only in edit mode) */}
          {isEditing && (
            <div className="mt-6 flex justify-center sm:justify-start">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;