export default function template1(pdfBuilder = {}) {
    const columnOrder = Object.keys(pdfBuilder.table_headings || {});
    const dataRows = pdfBuilder.data || [];

    // Formatea los valores de la celda para evitar null/undefined u objetos
    const formatCell = (value) => {
        if (value === null || value === undefined) return 'N/A';
        if (typeof value === 'number') return value.toLocaleString();
        return String(value);
    };

    // Genera las filas de la tabla
    const tableBody = dataRows.map(rowData => `
        <tr>
            ${columnOrder.map(key => `<td>${formatCell(rowData[key])}</td>`).join('')}
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        :root {
            --primary: #1e293b; 
            --secondary: #64748b; 
            --accent-bg: #f1f5f9;
            --date-bg: #e2e8f0; 
            --border: #cbd5e1; 
            --text: #1e293b;
            --description-color: #475569; 
        }
        body { font-family: 'Inter', sans-serif; color: var(--text); padding: 40px; }
        
        /* Header */
        header { display: flex; justify-content: space-between; border-bottom: 2px solid var(--primary); padding-bottom: 20px; margin-bottom: 30px; gap: 20px; }
        #company_logo { max-height: 60px; }
        .header-content { flex: 1; padding-left: 15px; }
        #company_name { font-size: 24px; font-weight: 700; margin: 0; color: var(--primary); }
        #report_title { font-size: 18px; font-weight: 600; margin: 5px 0 0 0; color: var(--secondary); }
        #report_description { 
            font-size: 14px; 
            font-weight: 400; 
            color: var(--description-color); 
            background-color: var(--accent-bg); 
            padding: 6px 10px; 
            border-radius: 6px; 
            margin-top: 8px; 
        }
        #report_date { background: var(--date-bg); padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; height: fit-content; }

        /* Tabla */
        #table_report { width: 100%; border-collapse: collapse; margin-top: 20px; }
        #table_report th { background: var(--primary); color: white; padding: 12px; text-align: left; font-size: 12px; }
        #table_report td { border: 1px solid var(--border); padding: 10px; font-size: 13px; }
    </style>
</head>
<body>
    <header>
        ${pdfBuilder.info_report?.company_logo ? `<img src="${pdfBuilder.info_report.company_logo}" id="company_logo" />` : ''}
        <div class="header-content">
            <h1 id="company_name">${pdfBuilder.info_report?.company_name || 'Reporte'}</h1>
            <h2 id="report_title">${pdfBuilder.info_report?.report_title || ''}</h2>
            ${pdfBuilder.info_report?.description ? `<h3 id="report_description">${pdfBuilder.info_report.description}</h3>` : ''}
        </div>
        <div id="report_date">
            Emitido: ${new Intl.DateTimeFormat('sv-SE').format(new Date())}
        </div>
    </header>

    <main>
        <table id="table_report">
            <thead>
                <tr>
                    ${columnOrder.map(key => `<th>${pdfBuilder.table_headings[key]}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${tableBody}
            </tbody>
        </table>
    </main>
</body>
</html>
`;
}
