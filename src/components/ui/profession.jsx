import React from "react";
import { useProfession } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const profession = getProfession(id);
    return !isLoading ? profession.name : <p>loading...</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
