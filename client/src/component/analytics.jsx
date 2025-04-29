import React, { useEffect, useState, useMemo } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import Chart from './chart.jsx';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/analytics.css';
import { parseISO, getWeek } from 'date-fns';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets/analysis`, {
          headers: { Authorization: token },
        });

        setAnalyticsData(res.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalysis();
  }, []);

  // ✅ Safely calculate chartData using useMemo (after data is fetched)
  const chartData = useMemo(() => {
    if (!analyticsData || !analyticsData.missedChats) return [];

    const weekCounts = {};
    analyticsData.missedChats.tickets.forEach(ticket => {
      const weekNum = getWeek(parseISO(ticket.createdAt)); // get the week number
      weekCounts[weekNum] = (weekCounts[weekNum] || 0) + 1;
    });

    // You can replace this with dynamic week logic too
    const currentWeek = getWeek(new Date());
    const recentWeeks = [currentWeek - 3, currentWeek - 2, currentWeek - 1, currentWeek];

    return recentWeeks.map(week => ({
      name: `Week ${week}`,
      missedChats: weekCounts[week] || 0,
    }));
  }, [analyticsData]);

  return (
    <div className='analytics'>
      <h2 style={{color:"#6A6B70", marginBottom: "20px"}}>Analysis</h2>
      <div className='chart1'>
        <h2>Missed Chats</h2>
        <div className='graph' >
          <Chart data={chartData} />
        </div>
      </div>

      <div className='chart'>
        <div>
          <h2>Average Reply Time</h2>
          <p>
            For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less.
            Quick responses will get you more conversations, help you earn customers' trust and make more sales.
          </p>
        </div>
        <h2>{analyticsData ? analyticsData.averageResponseTimeMinutes : 'Loading...'} mins</h2>
      </div>

      <div className='chart'>
        <div>
          <h2>Resolved Tickets</h2>
          <p>
            A callback system on a website, as well as proactive invitations, help to attract even more customers.
            A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.
          </p>
        </div>
        <div style={{ width: 70, height: 70 }}>
          <CircularProgressbar 
            value={analyticsData?.resolvedPercentage || 0} 
            text={`${analyticsData?.resolvedPercentage || 0}%`} 
          />
        </div>
      </div>

      <div className='chart'>
        <div>
          <h2>Total Chats</h2>
          <p>This metric shows the total number of chats for all channels for the selected period.</p>
        </div>
        <h2>{analyticsData ? analyticsData.totalTickets : 'Loading...'} Chats</h2>
      </div>
    </div>
  );
}
