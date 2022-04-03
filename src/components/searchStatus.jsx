import React from "react";

 const SearchStatus = (props) => {

    const length = props.length;

    const getBageClasses = () => {
        let classes = "badge p-2 m-2 "
        classes += length === 0 ? "bg-danger" : "bg-primary";
        return classes;
    }

    const renderPhrase = () => {
        if (length === 0) return "Никто с тобой не тусанет";
        if (length === 1) return "1 человек тусанет с тобой сегодня";
        let phrase = `${length}`;
        phrase += ((length % 10 === 2 || length % 10 === 3 || length % 10 === 4)  && (length > 20 || length < 10))
            ? ' человека'
            : ' человек';
        return phrase += ' тусанут с тобой сегодня';
    }

    return  <h2><span className={ getBageClasses() }> { renderPhrase() } </span></h2>
}

export default SearchStatus;
