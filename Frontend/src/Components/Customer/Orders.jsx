import { CheckCircle, Package, Truck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const mockOrders = [
	{
		_id: "1",
		orderId: "ORD123456",
		date: "2024-06-01",
		status: "Delivered",
		total: 2499.99,
		items: [
			{
				name: "Premium Bag",
				image: null,
				price: 1499.99,
				quantity: 1,
			},
			{
				name: "Designer Glasses",
				image: null,
				price: 999.99,
				quantity: 1,
			},
		],
	},
	{
		_id: "2",
		orderId: "ORD123457",
		date: "2024-05-20",
		status: "Shipped",
		total: 799.99,
		items: [
			{
				name: "T-Shirt",
				image: null,
				price: 799.99,
				quantity: 1,
			},
		],
	},
];

const statusIcon = {
	Delivered: <CheckCircle className="text-green-500 w-5 h-5" />,
	Shipped: <Truck className="text-blue-500 w-5 h-5" />,
	Processing: <Package className="text-yellow-500 w-5 h-5" />,
	Cancelled: <XCircle className="text-red-500 w-5 h-5" />,
};

const Orders = () => {
	// Replace mockOrders with real orders from Redux or API
	const [orders, setOrders] = useState([]);
	// const { orders, status } = useSelector((state) => state.orders);

	useEffect(() => {
		// Fetch orders here (API call or Redux)
		setOrders(mockOrders);
	}, []);

	return (
		<div className="container mx-auto px-4 py-8 min-h-[70vh]">
			<h1 className="text-3xl font-bold mb-8 text-purple-600 flex items-center gap-2">
				<Package className="w-7 h-7" /> My Orders
			</h1>
			{orders.length === 0 ? (
				<div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
					You have no orders yet.
				</div>
			) : (
				<div className="space-y-8">
					{orders.map((order) => (
						<div
							key={order._id}
							className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
						>
							<div className="flex-1">
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
									<div>
										<span className="text-sm text-gray-500">Order ID:</span>
										<span className="ml-2 font-semibold text-gray-700">
											{order.orderId}
										</span>
									</div>
									<div className="flex items-center gap-2 mt-2 sm:mt-0">
										{statusIcon[order.status]}
										<span
											className={`font-medium ${
												order.status === "Delivered"
													? "text-green-600"
													: order.status === "Shipped"
													? "text-blue-600"
													: order.status === "Processing"
													? "text-yellow-600"
													: "text-red-600"
											}`}
										>
											{order.status}
										</span>
									</div>
								</div>
								<div className="flex flex-wrap gap-4">
									{order.items.map((item, idx) => (
										<div
											key={idx}
											className="flex items-center gap-4 bg-gray-50 rounded p-3"
										>
											<div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
												{item.image ? (
													<img
														src={item.image}
														alt={item.name}
														className="object-cover w-full h-full"
													/>
												) : (
													<span className="text-gray-400 text-xs">
														No Image
													</span>
												)}
											</div>
											<div>
												<div className="font-semibold text-gray-800">
													{item.name}
												</div>
												<div className="text-sm text-gray-500">
													Qty: {item.quantity}
												</div>
												<div className="text-sm text-purple-600 font-bold">
													₹{item.price.toFixed(2)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col items-end gap-2 min-w-[150px]">
								<div className="text-gray-500 text-sm">Order Date</div>
								<div className="font-medium text-gray-700">
									{order.date}
								</div>
								<div className="mt-2 text-lg font-bold text-purple-600">
									Total: ₹{order.total.toFixed(2)}
								</div>
								<button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm">
									View Details
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Orders;
