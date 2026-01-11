export async function templateFromHtml(pdfBuilder = {}, obj = {}) {
    let content;
    switch (pdfBuilder.type_report) {
        case "type_table": content = await templateFromTable(pdfBuilder); break;
        case "type_bar": content = await templateGraphics(obj); break;
        case "type_pie": content = await templateGraphics(obj); break;
    }

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            /* Paleta profesional */
            --primary: #2c3e50;           /* Azul oscuro elegante */
            --primary-light: #34495e;     /* Azul medio */
            --secondary: #3498db;         /* Azul claro profesional */
            --accent: #1abc9c;            /* Verde agua sutil */
            --success: #27ae60;           /* Verde profesional */
            --border: #ecf0f1;           /* Borde gris claro */
            --light-bg: #f8f9fa;         /* Fondo muy claro */
            --card-bg: #ffffff;          /* Blanco puro */
            --text-primary: #2c3e50;    /* Texto oscuro */
            --text-secondary: #7f8c8d;  /* Texto gris */
            --shadow: rgba(0, 0, 0, 0.08);
        }

        body {
            font-family: 'Inter', sans-serif;
            color: var(--text-primary);
            padding: 40px;
            margin: 0;
            background-color: var(--light-bg);
            line-height: 1.5;
            font-size: 14px;
        }

        /* HEADER - TODO EN UNA FILA HORIZONTAL */
        header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 30px;
            padding: 25px 30px;
            margin-bottom: 30px;
            background-color: var(--card-bg);
            border-radius: 10px;
            box-shadow: 0 3px 10px var(--shadow);
            border-left: 5px solid var(--secondary);
            flex-wrap: nowrap;
        }

        /* Logo a la izquierda */
        #company_logo {
            max-height: 70px;
            max-width: 180px;
            object-fit: contain;
            flex-shrink: 0;
        }

        /* Contenido central - título y descripción */
        .header-content {
            flex: 1;
            min-width: 300px;
        }

        #company_name {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 8px 0;
            color: var(--primary);
        }

        #report_title {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 10px 0;
            color: var(--primary-light);
        }

        #report_description {
            font-size: 14px;
            font-weight: 400;
            color: var(--text-secondary);
            margin: 5px 0 0 0;
            line-height: 1.5;
        }

        /* Información de fecha a la derecha */
        #report_date {
            background: linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%);
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            color: var(--primary);
            text-align: right;
            min-width: 200px;
            border: 1px solid var(--border);
            flex-shrink: 0;
            align-self: stretch;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        #report_date strong {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
            color: var(--secondary);
        }

        #report_date .registros {
            display: inline-block;
            background: var(--accent);
            color: white;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 8px;
        }

        /* MAIN CONTENT */
        main {
            background-color: var(--card-bg);
            padding: 0;
            border-radius: 10px;
            box-shadow: 0 3px 10px var(--shadow);
            overflow: hidden;
            border: 1px solid var(--border);
            min-height: 500px;
        }

        /* Estilos para tablas */
        .table-container {
            width: 100%;
            overflow-x: auto;
        }

        #table_report {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
            background-color: var(--card-bg);
        }

        #table_report th {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
            color: white;
            padding: 16px 20px;
            text-align: left;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
        }

        #table_report td {
            border-bottom: 1px solid var(--border);
            padding: 14px 20px;
            font-size: 14px;
            color: var(--text-primary);
        }

        #table_report tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        #table_report tbody tr:last-child td {
            border-bottom: none;
        }

        /* Filas únicas */
        .row_unique {
            background: linear-gradient(135deg, #e8f4fc 0%, #d6eaf8 100%);
            color: var(--primary);
            font-weight: 600;
        }

        .column_unique {
            text-align: right !important;
            padding: 16px 20px !important;
            font-size: 14px;
            letter-spacing: 0.3px;
            border-top: 2px solid var(--accent) !important;
        }

        /* Contenedor de gráficos */
        .contenedor-grafico {
            padding: 30px;
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .contenedor-grafico canvas {
            width: 100% !important;
            height: 100% !important;
            max-width: 800px;
            max-height: 400px;
        }

        /* FOOTER */
        footer {
            margin-top: 30px;
            text-align: center;
            padding: 15px;
            color: var(--text-secondary);
            font-size: 12px;
            border-top: 1px solid var(--border);
            background-color: var(--card-bg);
            border-radius: 8px;
            box-shadow: 0 2px 5px var(--shadow);
        }

        /* RESPONSIVE - Mantener horizontal hasta que sea necesario */
        @media (max-width: 900px) {
            header {
                flex-wrap: wrap;
                gap: 20px;
            }
            
            #company_logo {
                max-height: 60px;
                max-width: 150px;
            }
            
            .header-content {
                min-width: 200px;
            }
            
            #report_date {
                width: 100%;
                text-align: left;
                min-width: auto;
            }
        }

        @media (max-width: 768px) {
            body {
                padding: 20px;
            }
            
            header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            #company_logo {
                align-self: flex-start;
            }
            
            #report_date {
                align-self: stretch;
            }
        }

        @media print {
            body {
                padding: 20px !important;
                background-color: white !important;
            }
            
            header, main, footer {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            
            #table_report {
                page-break-inside: avoid;
            }
            
            .contenedor-grafico {
                page-break-inside: avoid;
                height: 450px !important;
            }
            
            /* Ocultar footer en impresión si prefieres */
            footer {
                display: none;
            }
        }

        /* Estilos para campos opcionales */
        .optional-field {
            color: var(--text-secondary);
            font-style: italic;
            font-size: 13px;
        }
    </style>
    </head>
    <body>
        <!-- HEADER CON TODO EN UNA FILA -->
        <header>
            ${pdfBuilder.info_report?.company_logo ? `<img src="${pdfBuilder.info_report.company_logo}" id="company_logo" />` : ''}
            <div class="header-content">
                <h1 id="company_name">${pdfBuilder.info_report?.company_name || 'Reporte'}</h1>
                <h2 id="report_title">${pdfBuilder.info_report?.report_title || ''}</h2>
                ${pdfBuilder.info_report?.description ? `<div id="report_description">${pdfBuilder.info_report.description}</div>` : ''}
            </div>
            <div id="report_date">
                <strong>📅 Emitido</strong>
                ${new Intl.DateTimeFormat('es-ES', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }).format(new Date())}
                <span class="registros">${pdfBuilder.data?.length || 0} registros</span>
            </div>
        </header>

        <main>${content}</main>
        
        <footer>
            Generado el ${new Intl.DateTimeFormat('es-ES', { 
                dateStyle: 'medium', 
                timeStyle: 'short' 
            }).format(new Date())}
        </footer>
    </body>
    </html>
    `;
}


const templateFromTable = async (pdfBuilder = {}) => {
    const columnOrder = Object.keys(pdfBuilder.table_headings || {});
    const dataRows = pdfBuilder.data || [];
    const row_unique = pdfBuilder.row_unique || [];

    const formatCell = (value) => {
        if (value === null || value === undefined) return '<span class="optional-field">—</span>';
        if (typeof value === 'number') {
            return new Intl.NumberFormat('es-ES').format(value);
        }
        return String(value);
    };

    const tableBody = dataRows.map(rowData => `
        <tr>
            ${columnOrder.map(key => `<td>${formatCell(rowData[key])}</td>`).join('')}
        </tr>
    `).join('');

    const rowUnique = row_unique.map(unique => `
        <tr class="row_unique">
            <td class="column_unique" colspan="${columnOrder.length}">${unique.title}: ${formatCell(unique.result)}</td>
        </tr>
    `).join('');

    return `
        <div class="table-container">
            <table id="table_report">
                <thead>
                    <tr>
                        ${columnOrder.map(key => `<th>${pdfBuilder.table_headings[key]}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableBody}
                    ${rowUnique}
                </tbody>
            </table>
        </div>`;
}

const templateGraphics = (obj = {}) => {
    const chartColors = [
        'rgba(52, 152, 219, 0.8)',   // Azul
        'rgba(46, 204, 113, 0.8)',   // Verde
        'rgba(155, 89, 182, 0.8)',   // Púrpura
        'rgba(241, 196, 15, 0.8)',   // Amarillo
        'rgba(230, 126, 34, 0.8)',   // Naranja
        'rgba(231, 76, 60, 0.8)',    // Rojo
        'rgba(149, 165, 166, 0.8)',  // Gris
        'rgba(26, 188, 156, 0.8)',   // Verde agua
        'rgba(52, 73, 94, 0.8)',     // Azul oscuro
        'rgba(127, 140, 141, 0.8)'   // Gris medio
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        devicePixelRatio: 2,
        plugins: {
            legend: {
                display: obj.type === "pie",
                position: 'right',
                labels: {
                    usePointStyle: true,
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    }
                }
            }
        },
        scales: obj.type === "bar" ? {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        } : {}
    };

    return `
        <div class="contenedor-grafico">
            <canvas id="miGrafico"></canvas>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <script>
            (function() {
                const ctx = document.getElementById('miGrafico').getContext('2d');
                
                new Chart(ctx, {
                    type: ${JSON.stringify(obj.type || 'bar')}, 
                    data: {
                        labels: ${JSON.stringify(obj.labels || [])},
                        datasets: [{
                            label: '${obj.label || 'Datos'}',
                            data: ${JSON.stringify(obj.data || [])},
                            backgroundColor: ${JSON.stringify(chartColors)},
                            borderWidth: 1
                        }]
                    },
                    options: ${JSON.stringify(chartOptions)}
                });
            })();
        </script>
    `;
}