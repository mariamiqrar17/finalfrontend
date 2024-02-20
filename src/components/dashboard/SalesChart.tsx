import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CountryData {
  month: string;
  participants_count: number;
  replies_count: number;
}

const SalesChart = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/articles");
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Merge participants_count and spam_score into one array of objects
  const chartData = countriesData.map((country) => ({
    month: country.month,
    value: country.replies_count,
    type: "Participant Count",
  })).concat(countriesData.map((country) => ({
    month: country.month,
    value: country.participants_count,
    type: "Spam Score",
  })));

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
    stroke: {
      curve: "straight",
      width: [3, 3], // Set the stroke width for each series
    },
    xaxis: {
      categories: chartData.map((data) => data.month),
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    colors: ["#008FFB", "#00E396"],
    legend: {
      show: true,
      labels: {
        colors: "#333",
      },
    },
  };

  const series = [
    {
      name: "Participant Count",
      data: chartData.filter((data) => data.type === "Participant Count").map((data) => data.value),
    },
    {
      name: "Replies Count",
      data: chartData.filter((data) => data.type === "Spam Score").map((data) => data.value),
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6"></CardSubtitle>
        {countriesData.length > 0 && (
          <Chart
            type="line"
            width="100%"
            height={390}
            options={chartOptions}
            series={series as any}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default SalesChart;
