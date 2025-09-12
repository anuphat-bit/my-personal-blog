import React, { useState } from 'react';

interface UserProfileProps {
  currentName: string;
  onNameChange: (newName: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ currentName, onNameChange }) => {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameChange(name.trim());
      alert('บันทึกชื่อเรียบร้อยแล้ว');
    } else {
      alert('กรุณากรอกชื่อของคุณ');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
      <h2 className="text-xl font-bold text-green-800 mb-4">โปรไฟล์ของคุณ</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ใส่ชื่อของคุณ"
          aria-label="Your name"
          className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 whitespace-nowrap"
        >
          บันทึกชื่อ
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
