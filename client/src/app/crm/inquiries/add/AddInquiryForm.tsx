"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEye, FiPlus } from "react-icons/fi";

export default function AddInquiryForm() {
  const [inquiryDate, setInquiryDate] = useState(new Date());
  const [closingDate, setClosingDate] = useState(new Date());
  const [followUpDate, setFollowUpDate] = useState(new Date());

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          📝 Add Inquiry
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Inquiry Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📅 Inquiry Date*
            </label>
            <DatePicker
              selected={inquiryDate}
              onChange={(date) => setInquiryDate(date as Date)}
              dateFormat="dd-MM-yyyy"
              className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🏢 Branch*
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm">
              <option>AERO ENGINEERS PVT LTD</option>
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🏛️ Company*
            </label>
            <div className="flex gap-2">
              <select className="flex-1 border rounded-md px-3 py-2 text-gray-700 shadow-sm">
                <option>Choose Company</option>
              </select>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow"
              >
                <FiPlus />
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-md shadow"
              >
                <FiEye />
              </button>
            </div>
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              👤 Contact Person
            </label>
            <div className="flex gap-2">
              <select className="flex-1 border rounded-md px-3 py-2 text-gray-700 shadow-sm">
                <option>Choose Contact</option>
              </select>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow"
              >
                <FiPlus />
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-md shadow"
              >
                <FiEye />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🔄 Stage*
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm">
              <option>Choose Through</option>
            </select>
          </div>

          {/* Inquiry Reference */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📌 Inquiry Reference
            </label>
            <input
              type="text"
              placeholder="Reference"
              className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm"
            />
          </div>

          {/* Closing Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📅 Closing Date
            </label>
            <DatePicker
              selected={closingDate}
              onChange={(date) => setClosingDate(date as Date)}
              dateFormat="dd-MM-yyyy"
              className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm"
            />
          </div>

          {/* Follow-up Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🔔 Follow-Up Date
            </label>
            <DatePicker
              selected={followUpDate}
              onChange={(date) => setFollowUpDate(date as Date)}
              showTimeSelect
              dateFormat="dd-MM-yyyy HH:mm"
              className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              💰 Currency
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm">
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
              <option>Colombian Peso-COP</option>
            </select>
          </div>

          {/* Total Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              💵 Total ($)
            </label>
            <input
              type="number"
              placeholder="6000.00"
              className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm"
            />
          </div>

          {/* Inquiry Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🗂️ Inquiry Category
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-gray-700 shadow-sm">
              <option>Choose Category</option>
            </select>
          </div>

          {/* Submit button */}
          <div className="lg:col-span-3 text-right pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              ✅ Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
