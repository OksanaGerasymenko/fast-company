import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const professionContext = React.createContext();
export const useProfession = () => {
    return useContext(professionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessions();
    }, []);
    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);

    async function getProfessions() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) { errorCatcher(error); }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <ProfessionProvider value={{ professions, isLoading }}>
            {!isLoading ? children : "profesiion loading..."}
        </ProfessionProvider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
