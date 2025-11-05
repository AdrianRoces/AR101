// src/components/dashboard/popups/AccountPopup.tsx (updated)
import { useState } from 'react';

interface AccountPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  onUserDataUpdate: (userData: any) => void;
}

export default function AccountPopup({ isOpen, onClose, userData, onUserDataUpdate }: AccountPopupProps) {
  const [currentEmail, setCurrentEmail] = useState(userData?.email || 'example@email.com');
  const [currentUsername, setCurrentUsername] = useState(userData?.name || 'User Name');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [sendNotifications, setSendNotifications] = useState(true);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUserData = {
      ...userData,
      email: newEmail && newEmail !== currentEmail ? newEmail : currentEmail,
      name: newUsername || currentUsername
    };

    if (newEmail && newEmail !== currentEmail) {
      // If email is being changed, mark as unverified
      setIsEmailVerified(false);
      setCurrentEmail(newEmail);
    } else {
      setCurrentEmail(updatedUserData.email);
    }
    
    if (newUsername) {
      setCurrentUsername(newUsername);
    } else {
      setCurrentUsername(updatedUserData.name);
    }
    
    // Update parent component with new user data
    onUserDataUpdate(updatedUserData);
    
    // Reset form
    setNewEmail('');
    setNewUsername('');
    setIsEditing(false);
    
    console.log('Saved changes:', updatedUserData);
  };

  const handleCancelEdit = () => {
    setNewEmail('');
    setNewUsername('');
    setIsEditing(false);
  };

  const handleEditSettings = () => {
    setIsEditing(true);
    // Pre-fill with current values for editing
    setNewEmail(currentEmail);
    setNewUsername(currentUsername);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Your Account</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Account Information Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">Account Information</h3>
            {!isEditing && (
              <button
                onClick={handleEditSettings}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base whitespace-nowrap"
              >
                Edit Settings
              </button>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-inner shadow-gray-300">
            {!isEditing ? (
              // Display Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm md:text-base text-gray-600 font-medium mb-2">Username</label>
                  <div className="w-full px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm md:text-base break-words min-h-[44px] flex items-center">
                    {currentUsername}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm md:text-base text-gray-600 font-medium">Email Address</label>
                    {!isEmailVerified && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                        Unverified
                      </span>
                    )}
                  </div>
                  <div className="w-full px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm md:text-base break-all min-h-[44px] flex items-center">
                    {currentEmail}
                  </div>
                  {!isEmailVerified && (
                    <p className="text-red-600 text-xs mt-2">
                      Please check your email to verify your new email address.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSaveChanges} className="space-y-4">
                <div>
                  <label className="block text-sm md:text-base text-gray-700 font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400 break-words min-h-[44px]"
                    required
                  />
                  <p className="text-gray-600 text-xs mt-2 break-words">
                    You will need to verify your new email address after you change it.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 md:py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base whitespace-nowrap"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 md:py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-sm md:text-base whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-6 md:mb-8" />

        {/* Permissions Section */}
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Permission</h3>
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-inner shadow-gray-300">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm md:text-base text-gray-700 font-medium break-words flex-1 pr-4">
                Send Notification to your Email
              </span>
              <button
                onClick={() => setSendNotifications(!sendNotifications)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors flex-shrink-0 ${
                  sendNotifications ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  sendNotifications ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}