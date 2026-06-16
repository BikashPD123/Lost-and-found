import jsPDF from 'jspdf';

import { type Item } from '../data/mockData';
import { format } from 'date-fns';

export const generateItemReport = async (item: Item) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // PDF Styling
  const primaryColor = [37, 99, 235]; // #2563eb
  const secondaryColor = [15, 23, 42]; // #0f172a
  
  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Foundry | Lost & Found Report', 20, 25);
  
  // Item ID and Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Report ID: ${item.id}`, 150, 15);
  doc.text(`Generated on: ${format(new Date(), 'PPP p')}`, 150, 22);

  // Main Content
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Item Information', 20, 55);
  
  // Table-like structure
  const startY = 65;
  const lineSpacing = 10;
  
  const fields = [
    { label: 'Item Name', value: item.name },
    { label: 'Type', value: item.type },
    { label: 'Status', value: item.status },
    { label: 'Location', value: item.location },
    { label: 'Report Date', value: format(new Date(item.date), 'PPP') },
    { label: 'Student Name', value: item.studentName },
    { label: 'Student ID', value: item.studentId },
    { label: 'Reported By', value: item.reportedBy },
    { label: 'Assigned To', value: item.assignedTo || 'Unassigned' },
  ];

  doc.setFontSize(12);
  fields.forEach((field, index) => {
    const currentY = startY + (index * lineSpacing);
    doc.setFont('helvetica', 'bold');
    doc.text(`${field.label}:`, 20, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(`${field.value}`, 60, currentY);
    
    // Subtle separator line
    doc.setDrawColor(241, 245, 249);
    doc.line(20, currentY + 3, 190, currentY + 3);
  });

  // Description Section
  const descY = startY + (fields.length * lineSpacing) + 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Description:', 20, descY);
  doc.setFont('helvetica', 'normal');
  const splitDesc = doc.splitTextToSize(item.description, 170);
  doc.text(splitDesc, 20, descY + 7);

  // Image Section
  if (item.image) {
    const imgY = descY + 25 + (splitDesc.length * 5);
    doc.setFont('helvetica', 'bold');
    doc.text('Item Photograph:', 20, imgY);
    
    try {
      // Add image to PDF
      // Note: item.image is a base64 data URL
      doc.addImage(item.image, 'JPEG', 20, imgY + 5, 80, 60);
    } catch (err) {
      console.error('Error adding image to PDF:', err);
      doc.setFontSize(10);
      doc.setTextColor(239, 68, 68);
      doc.text('[Could not attach item photograph]', 20, imgY + 10);
    }
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This is a computer-generated report from Foundry University Management System.', 20, pageHeight - 15);
  doc.text('For official use only.', 20, pageHeight - 10);

  // Save the PDF
  doc.save(`Report_${item.id}_${item.name.replace(/\s+/g, '_')}.pdf`);
};
