import React from 'react';
import PropTypes from 'prop-types';

const CommonTable = (props) => {
    const { data, column, renderTbHeader, className = '', endColumn } = props;

    return (
        <div>
            <table className={`common-table fixed-header-table ${className}`}>
                {renderTbHeader && (
                    <thead className="table-header-div">
                    <tr>
                        <th colSpan={column.length} className="">
                            {renderTbHeader()}
                        </th>
                    </tr>
                    </thead>
                )}
                <thead>
                <tr>
                    {column.map((tr, index) => (
                        <th key={tr.field} className={` ${tr.thClass ?? ''}`} style={{ textTransform: 'uppercase' }}>
                            {tr.renderTh ? tr.renderTh(tr.name, tr, index) : tr.name}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {column.map((tr, colIndex) => (
                            <td data-th={tr.name} key={tr.field} className={`${tr.tdClass}`}>
                                {tr.render ? tr.render(item[tr.field], item, index, colIndex) : item[tr.field]}
                            </td>
                        ))}
                    </tr>
                ))}
                {endColumn && endColumn()}
                </tbody>
            </table>
        </div>
    );
};

CommonTable.propTypes = {
    className: PropTypes.string,
    column: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired,
            tdClass: PropTypes.string,
            thClass: PropTypes.string,
            render: PropTypes.func,
            renderTh: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    endColumn: PropTypes.func,
    renderTbHeader: PropTypes.func,
};

export default CommonTable;
