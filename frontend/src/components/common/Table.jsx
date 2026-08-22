import React from 'react';

export const Table = ({ columns, data, emptyMessage = 'No data available' }) => {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} style={styles.tr}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={styles.td}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={styles.emptyTd}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text-muted)',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--color-card-border)',
  },
  tr: {
    borderBottom: '1px solid var(--color-card-border)',
    transition: 'background-color var(--transition-speed)',
  },
  td: {
    padding: '14px 16px',
    fontSize: '0.9rem',
    color: 'var(--color-text-main)',
  },
  emptyTd: {
    padding: '32px 16px',
    textAlign: 'center',
    color: 'var(--color-text-muted)',
    fontSize: '0.9rem',
  },
};
