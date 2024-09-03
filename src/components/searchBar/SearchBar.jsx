
import React from "react";
import { RiSearchLine } from "@remixicon/react";
import styles from "./searchbar.module.css";

const SearchBar = ({ searchTerm, onChange }) => {
    return (
        <div className={styles.searchBar}>
            <input
            className={styles.input}
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={onChange}
            />
            <RiSearchLine size={18} color="gray" className={styles.searchIcon} />
        </div>
    )
};

export default SearchBar;