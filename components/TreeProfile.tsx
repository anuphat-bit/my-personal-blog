import React, { useState } from 'react';

interface TreeProfileProps {
  currentName: string;
  onNameChange: (newName: string) => void;
}

const TreeProfile: React.FC<TreeProfileProps> = ({ currentName, onNameChange }) => {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameChange(name.trim());
      alert('บันทึกชื่อต้นไม้เรียบร้อยแล้ว');
    } else {
      alert('กรุณากรอกชื่อต้นไม้');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
      <h2 className="text-xl font-bold text-green-800 mb-4">ตั้งชื่อต้นไม้ของคุณ</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ใส่ชื่อต้นไม้"
          aria-label="Tree name"
          className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 whitespace-nowrap"
        >
          บันทึกชื่อต้นไม้
        </button>
      </form>
    </div>
  );
};

export default TreeProfile;
