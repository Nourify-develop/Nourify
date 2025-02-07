
import Image from 'next/image';

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string | number;
  percentageChange: number;
  icon: string;
}

interface StatsProps {
  stats: StatCardProps[];
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  subtitle,
  value,
  percentageChange,
  icon,
}) => {
  const isPositive = percentageChange >= 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <Image
          src={icon}
          alt={`${title} icon`}
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
      <div className="flex justify-between items-end">
        <p className="text-2xl font-semibold">
          {typeof value === 'string' && value.startsWith('N') ? (
            <span className="font-normal">N</span>
          ) : null}
          {value}
        </p>
        <div className={`flex flex-col items-center ${isPositive ? 'text-green-500' : 'text-orange-600'}`}>
          <Image
            src={isPositive ? '/images/trade-up.svg' : '/images/trade-down.svg'}
            alt="trend"
            width={16}
            height={16}
            className="mr-1"
          />
          <span className="text-sm">{`${isPositive ? '+' : ''}${percentageChange}%`}</span>
        </div>
      </div>
    </div>
  );
};

const StatsDashboard: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};


const statsData = [
  {
    title: 'Total sales',
    subtitle: 'Last 30 days',
    value: '450,452.00',
    percentageChange: 2.4,
    icon: '/images/sales.svg'
  },
  {
    title: 'Total Order',
    subtitle: 'Last 30 days',
    value: '30,435',
    percentageChange: 2.4,
    icon: '/images/order.svg'
  },
  {
    title: 'Total Customers',
    subtitle: 'Last 30 days',
    value: 257,
    percentageChange: -0.8,
    icon: '/images/customer.svg'
  }
];


export default function StatsCardSection() {
  return (
    <div className="p-6">
      <StatsDashboard stats={statsData} />
    </div>
  );
}