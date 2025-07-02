"use client";

import AddInquiryForm from "./AddInquiryForm";
import Breadcrumb from "@/components/Breadcrumb"; // Adjust path if needed

export default function AddInquiryPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inquiry List" },
  ];
  return (
    <div className="p-6 text-black">
      <Breadcrumb items={breadcrumbItems} />
      <AddInquiryForm />
    </div>
  );
}
