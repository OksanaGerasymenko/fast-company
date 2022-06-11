import React, { useState, useEffect, useContext } from "react";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualityContext = React.createContext();
export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getQualitiesList();
    }, []);
    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) { errorCatcher(error); }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getQualitiesForUser(qualitiesId) {
        const qualitiesForUser = [];
        qualitiesId.forEach(id => {
            const quality = qualities.find(q => q._id === id);
            qualitiesForUser.push(quality);
        });
        return qualitiesForUser;
    }

    return <QualityContext.Provider
        value = {{ qualities, isLoading, getQualitiesForUser }}
    >
        { children }
    </QualityContext.Provider>;
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
