import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Task } from '../types';

export const generateTasksPDF = (tasks: Task[], title: string = 'Tasks Report'): void => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  // Add generation date
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy')}`, 14, 30);
  
  // Create a table with task data
  const tableColumn = ["Title", "Assigned To", "Deadline", "Status"];
  const tableRows = tasks.map(task => [
    task.title,
    task.assignedTo,
    format(new Date(task.deadline), 'MMM dd, yyyy'),
    task.status
  ]);
  
  // Add the table to the PDF
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    styles: { fontSize: 10 },
    headStyles: { 
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    },
    columnStyles: {
      2: { halign: 'center' },
      3: { halign: 'center' }
    },
    didDrawCell: (data) => {
      // Add custom styling for status cells
      if (data.column.index === 3 && data.cell.section === 'body') {
        const status = data.cell.raw;
        if (status === 'Done') {
          doc.setFillColor(34, 197, 94, 0.2);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(22, 163, 74);
        } else if (status === 'In Progress') {
          doc.setFillColor(59, 130, 246, 0.2);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(37, 99, 235);
        } else if (status === 'Pending') {
          doc.setFillColor(245, 158, 11, 0.2);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(217, 119, 6);
        }
      }
    }
  });
  
  // Add summary information
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text('Summary', 14, finalY);
  
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  
  doc.setFontSize(10);
  doc.text(`Total Tasks: ${tasks.length}`, 14, finalY + 7);
  doc.text(`Pending: ${pendingTasks}`, 14, finalY + 14);
  doc.text(`In Progress: ${inProgressTasks}`, 14, finalY + 21);
  doc.text(`Completed: ${completedTasks}`, 14, finalY + 28);
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
      'Task Management System - Confidential',
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() - 20,
      doc.internal.pageSize.getHeight() - 10
    );
  }
  
  // Save the PDF
  doc.save('tasks-report.pdf');
};