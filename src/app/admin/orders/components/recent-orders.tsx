import Image from 'next/image';

interface Order {
  id: string;
  productName: string;
  productImage: string;
  category: string;
  date: string;
  price: string;
  status: 'Shipped' | 'Pending' | 'Completed' | 'Rejected';
}

interface RecentOrdersProps {
  orders: Order[];
}

const getStatusStyles = (status: Order['status']) => {
    const baseStyles = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Shipped':
        return `${baseStyles} bg-blue-100 text-blue-800`;
        case 'Pending':
            return `${baseStyles} bg-[#FFF8E6] text-[#B25B00]`;
      case 'Completed':
        return `${baseStyles} bg-green-50 text-green-800`;
      case 'Rejected':
        return `${baseStyles} bg-[#FEE4E2] text-[#D92D20]`; 
      default:
        return baseStyles;
    }
  };

const RecentOrders = () => {
  const orders: Order[] = [
    {
      id: "#4572464922748",
      productName: "Chocolate Cake",
      productImage: "/images/cake.svg",
      category: "Pastries",
      date: "5th November, 2024",
      price: "N25,000.00",
      status: "Shipped"
    },
    {
      id: "#4572464922748",
      productName: "Fresh Tomatoes",
      productImage: "/images/tomatoes.svg",
      category: "Groceries",
      date: "5th November, 2024",
      price: "N25,000.00",
      status: "Pending"
    },
    {
      id: "#4572464922748",
      productName: "Meat Pie",
      productImage: "/images/meatpie.svg",
      category: "Pastries",
      date: "5th November, 2024",
      price: "N25,000.00",
      status: "Completed"
    },
    {
      id: "#4572464922748",
      productName: "Garden Cucumbers",
      productImage: "/images/cucumber.svg",
      category: "Groceries",
      date: "5th November, 2024",
      price: "N25,000.00",
      status: "Rejected"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-300 my-[2em] mx-[1.3em]">
      <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-4">Product Photo</th>
              <th className="pb-4">Product Name</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4">
                  <div className="h-18 w-16 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={order.productImage}
                      alt={order.productName}
                      width={64}
                      height={64}
                      className="object-cover p-2"
                    />
                  </div>
                </td>
                <td className="py-4">
                  <div>
                    <p className="font-medium">{order.productName}</p>
                    <p className="text-sm text-gray-500">{order.id}</p>
                  </div>
                </td>
                <td className="py-4 text-gray-600">{order.category}</td>
                <td className="py-4 text-gray-600">{order.date}</td>
                <td className="py-4 text-gray-600">{order.price}</td>
                <td className="py-4">
                  <span className={getStatusStyles(order.status)}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;