import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        const component = columns[column].component;
        if (component) {
            return typeof component === "function" ? component(item) : component;
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map(item =>
                <tr key = {item._id}>
                    {Object.keys(columns).map(column => (
                        <td key={column}>
                            {renderContent(item, column)}
                        </td>
                    ))
                    }
                </tr>
            )}
        </tbody>
    );
};
TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
