import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    product: "",
    category: "",
    storeName: "",
    quantity: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/stock/getall");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/stock/delete/${id}`);
      setStocks(stocks.filter((stock) => stock._id !== id));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:4000/stock/update/${modalData._id}`,
          modalData
        );
      } else {
        await axios.post("http://localhost:4000/stock/add", modalData);
      }
      setShowModal(false);
      setModalData({ product: "", category: "", storeName: "", quantity: "" });
      fetchStocks();
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  const openModal = (stock = null) => {
    if (stock) {
      setModalData(stock);
      setEditMode(true);
    } else {
      setModalData({ product: "", category: "", storeName: "", quantity: "" });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // Filter stocks based on the search query
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1">
        <div className="p-6">
          <div className="flex justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Quick search"
                className="pl-10 pr-4 py-2 border rounded-md w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => openModal()}
            >
              + New Stock
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Store Name</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{stock.product}</td>
                    <td className="p-3">{stock.category}</td>
                    <td className="p-3">{stock.storeName}</td>
                    <td className="p-3">{stock.quantity}</td>
                    <td className="p-3">
                      <button
                        className="text-blue-600 hover:underline mr-2"
                        onClick={() => openModal(stock)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(stock._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-1/3">
              <h2 className="text-xl font-semibold mb-4">
                {editMode ? "Edit Stock" : "Add New Stock"}
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-2">Product</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={modalData.product}
                    onChange={(e) =>
                      setModalData({ ...modalData, product: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Category</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={modalData.category}
                    onChange={(e) =>
                      setModalData({ ...modalData, category: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Store Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={modalData.storeName}
                    onChange={(e) =>
                      setModalData({ ...modalData, storeName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Quantity</label>
                  <input
                    type="number"
                    className="w-full border rounded-md px-3 py-2"
                    value={modalData.quantity}
                    onChange={(e) =>
                      setModalData({ ...modalData, quantity: e.target.value })
                    }
                  />
                </div>
              </form>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Stock;