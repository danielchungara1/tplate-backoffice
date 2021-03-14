import React, { useEffect, useState } from "react";
import "react-toggle/style.css"
import Toggle from "react-toggle";

const DARK_CLASS = "dark";

export const DarkToggle = () => {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add(DARK_CLASS);
        } else {
            document.documentElement.classList.remove(DARK_CLASS);
        }
    }, [isDark]);

    return (
        <Toggle
            className="DarkToggle"
            checked={isDark}
            onChange={toggleEvent => setIsDark(toggleEvent.target.checked)}
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Dark mode"
        />
    );
};