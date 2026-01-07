import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./contribution.css";


function ContributionCount() {
 const contributions = [
  // JAN
  { date: "2025-01-01", count: 1 },
  { date: "2025-01-02", count: 3 },
  { date: "2025-01-03", count: 5 },
  { date: "2025-01-05", count: 2 },
  { date: "2025-01-08", count: 4 },
  { date: "2025-01-10", count: 6 },
  { date: "2025-01-12", count: 1 },
  { date: "2025-01-15", count: 8 },
  { date: "2025-01-18", count: 3 },
  { date: "2025-01-22", count: 5 },
  { date: "2025-01-25", count: 2 },
  { date: "2025-01-28", count: 7 },

  // FEB
  { date: "2025-02-01", count: 8 },
  { date: "2025-02-02", count: 4 },
  { date: "2025-02-04", count: 6 },
  { date: "2025-02-06", count: 2 },
  { date: "2025-02-08", count: 1 },
  { date: "2025-02-10", count: 5 },
  { date: "2025-02-12", count: 3 },
  { date: "2025-02-14", count: 4 },
  { date: "2025-02-16", count: 7 },
  { date: "2025-02-18", count: 2 },
  { date: "2025-02-20", count: 6 },
  { date: "2025-02-24", count: 1 },
  { date: "2025-02-27", count: 5 },

  // MAR
  { date: "2025-03-01", count: 2 },
  { date: "2025-03-03", count: 4 },
  { date: "2025-03-05", count: 6 },
  { date: "2025-03-07", count: 1 },
  { date: "2025-03-09", count: 3 },
  { date: "2025-03-11", count: 8 },
  { date: "2025-03-14", count: 5 },
  { date: "2025-03-16", count: 2 },
  { date: "2025-03-18", count: 7 },
  { date: "2025-03-20", count: 4 },
  { date: "2025-03-22", count: 6 },
  { date: "2025-03-25", count: 1 },
  { date: "2025-03-28", count: 5 },

  // APR
  { date: "2025-04-01", count: 3 },
  { date: "2025-04-03", count: 6 },
  { date: "2025-04-05", count: 2 },
  { date: "2025-04-07", count: 4 },
  { date: "2025-04-09", count: 7 },
  { date: "2025-04-11", count: 1 },
  { date: "2025-04-13", count: 5 },
  { date: "2025-04-15", count: 8 },
  { date: "2025-04-18", count: 3 },
  { date: "2025-04-21", count: 6 },
  { date: "2025-04-24", count: 2 },
  { date: "2025-04-27", count: 4 },
];


  return (
    <div className="bg-[#010409] p-6 rounded border border-gray-800">
    <h2 className="text-white mb-4 font-semibold">
        Contribution activity
    </h2>

  
<CalendarHeatmap
  startDate={new Date("2024-12-29")} // Sunday before Jan 1, 2025
  endDate={new Date("2025-12-31")}
  weekStart={0} // Sunday (GitHub style)
  values={contributions}
  classForValue={(value) => {
    if (!value || !value.count) return "color-empty";
    if (value.count >= 8) return "color-github-4";
    if (value.count >= 5) return "color-github-3";
    if (value.count >= 2) return "color-github-2";
    return "color-github-1";
  }}
  showWeekdayLabels
/>

    </div>
  );
}

export default ContributionCount;
