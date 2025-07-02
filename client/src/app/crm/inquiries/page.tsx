'use client';

import InquiryTable from './InquiryTable';
import Breadcrumb from '@/components/Breadcrumb'; // Adjust path if needed

export default function Page() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Inquiry List' },
  ];

  return (
    <div className="p-4 text-black">
      <Breadcrumb items={breadcrumbItems} />
      <InquiryTable />
    </div>
  );
}
