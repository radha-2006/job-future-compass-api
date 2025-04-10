
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillAssessment } from '@/services/api';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SkillsRadarProps {
  skills: SkillAssessment[];
}

const SkillsRadar: React.FC<SkillsRadarProps> = ({ skills }) => {
  // Transform skills into radar chart data
  const radarData = skills.map(item => ({
    subject: item.skill,
    value: item.level,
    fullMark: 10
  }));

  return (
    <Card className="future-card w-full">
      <CardHeader>
        <CardTitle className="text-lg">Your Skill Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-1 md:p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#6b7280' }} />
            <Radar
              name="Your Skills"
              dataKey="value"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SkillsRadar;
