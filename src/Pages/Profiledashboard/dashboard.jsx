import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } transition-opacity duration-300`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: '',
    occupation: '',
    skills: '',
    interests: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

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
        setNotification({ message: 'Authentication required. Please log in to access your profile.', type: 'error' });
        return;
      }

      try {
        const res = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setStudent(data);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          education: data.education || '',
          occupation: data.occupation || '',
          skills: data.skills?.join(', ') || '',
          interests: data.interests?.join(', ') || '',
        });
        setAvatarPreview(data.avatar || null);
      } catch (err) {
        setNotification({ message: 'Unable to retrieve profile data. Please try again later.', type: 'error' });
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
        setNotification({ message: 'Invalid file format. Please select a valid image file (e.g., JPG, PNG).', type: 'error' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setNotification({ message: 'File size exceeds the limit. Please select an image smaller than 5MB.', type: 'error' });
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setNotification({ message: '', type: '' });
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    setNotification({ message: '', type: '' });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotification({ message: 'Authentication required. Please log in to update your profile.', type: 'error' });
        setSaving(false);
        return;
      }

      const payload = new FormData();
      payload.append('firstName', formData.firstName);
      payload.append('lastName', formData.lastName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('education', formData.education);
      payload.append('occupation', formData.occupation);
      payload.append('skills', formData.skills);
      payload.append('interests', formData.interests);
      if (avatarFile) {
        payload.append('avatar', avatarFile);
      }

      const res = await axios.put('https://lms-backend-flwq.onrender.com/api/v1/auth/updatedetails', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedData = res.data.data;
      setStudent((prev) => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        avatar: updatedData.avatar || prev.avatar,
        education: formData.education,
        occupation: formData.occupation,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
        interests: formData.interests.split(',').map((interest) => interest.trim()),
      }));
      setNotification({ message: 'Your profile has been updated successfully.', type: 'success' });
      setAvatarFile(null);
      setAvatarPreview(updatedData.avatar || avatarPreview);
      setIsEditing(false);
    } catch (err) {
      setNotification({
        message: `Failed to update profile: ${err.response?.data?.message || 'An error occurred. Please try again.'}`,
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setNotification({ message: '', type: '' });
    setAvatarFile(null);
    if (!isEditing) {
      setAvatarPreview(student.avatar || null);
    }
  };

  return (
    <div className="bg-white rounded-xl h-fit shadow mt-12 md:mt-6 p-4 sm:p-6 w-full">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="h-24 sm:h-28 w-full rounded-xl mb-10 bg-gradient-to-r from-blue-200 to-yellow-100"></div>

      {student && (
        <>
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 -mt-20 sm:-mt-16 sm:ml-4 text-center sm:text-left">
              <div className="relative">
                <img
                  src={avatarPreview || 'default profile.jpg'}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow object-cover"
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
          </div>

          {/* Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {/* Editable Fields in Edit Mode */}
            {isEditing ? (
              <>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs sm:text-sm">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm"
                  />
                </div>
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
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Buttons Section */}
          <div className="mt-6 flex justify-center sm:justify-start gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-[#49BBBD] hover:bg-[#3AA8AA] text-white px-6 py-2 rounded-md text-sm sm:text-base"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={toggleEditMode}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm sm:text-base"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={toggleEditMode}
                className="bg-[#49BBBD] hover:bg-[#3AA8AA] text-white px-6 py-2 rounded-md text-sm sm:text-base"
              >
                Edit Profile
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;