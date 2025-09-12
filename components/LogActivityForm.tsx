
import React, { useState, useEffect } from 'react';

interface LogActivityFormProps {
  onAddActivity: (description: string, points: number) => void;
}

const predefinedActivities = {
  'ใช้เอกสารดิจิทัลแทนการพิมพ์': 10,
  'เลือกรับบิลออนไลน์': 5,
  'ใช้กระดาษสองหน้า': 5,
  'นำกระดาษกลับมาใช้ใหม่': 3,
  'อื่นๆ': 0,
};

const LogActivityForm: React.FC<LogActivityFormProps> = ({ onAddActivity }) => {
  const [selectedActivity, setSelectedActivity] = useState<string>('ใช้เอกสารดิจิทัลแทนการพิมพ์');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [points, setPoints] = useState<number>(10);

  useEffect(() => {
    if (selectedActivity !== 'อื่นๆ') {
      setPoints(predefinedActivities[selectedActivity as keyof typeof predefinedActivities]);
    } else {
      setPoints(1); 
    }
  }, [selectedActivity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (points <= 0) {
        alert("กรุณาใส่คะแนนให้มากกว่า 0");
        return;
    }
    const description = selectedActivity === 'อื่นๆ' ? customDescription : selectedActivity;
    if (!description.trim()) {
        alert("กรุณากรอกรายละเอียดกิจกรรม");
        return;
    }
    onAddActivity(description, points);
    
    // Reset form
    setSelectedActivity('ใช้เอกสารดิจิทัลแทนการพิมพ์');
    setCustomDescription('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
      <h2 className="text-xl font-bold text-green-800 mb-4">บันทึกกิจกรรมลดใช้กระดาษ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="activity" className="block text-sm font-medium text-green-700 mb-1">
            เลือกกิจกรรม
          </label>
          <select
            id="activity"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            {Object.keys(predefinedActivities).map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div>

        {selectedActivity === 'อื่นๆ' && (
          <div>
            <label htmlFor="custom-description" className="block text-sm font-medium text-green-700 mb-1">
              รายละเอียดกิจกรรม
            </label>
            <input
              type="text"
              id="custom-description"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="เช่น ประชุมไม่ใช้กระดาษ"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="points" className="block text-sm font-medium text-green-700 mb-1">
            คะแนนที่ได้
          </label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value, 10))}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
            readOnly={selectedActivity !== 'อื่นๆ'}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
        >
          เพิ่มกิจกรรม
        </button>
      </form>
    </div>
  );
};

export default LogActivityForm;
