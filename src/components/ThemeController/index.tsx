import { useEffect, useState } from "react";
import { THEMES } from "../../enums";

const ThemeController = () => {
    // No validation is applied yet
    // Not associated with Email yet
    const [theme, setTheme] = useState<THEMES>(() => {
        const localData = localStorage.getItem("preferredTheme");
        return localData ? (localData as THEMES) : THEMES.LIGHT;
    });

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // This state is used to control the Select element
        setTheme(e.target.value as THEMES);
    };

    useEffect(() => {
        // Then manually change the HTML theme
        const myHtml = document.documentElement;
        myHtml.setAttribute("data-theme", theme as string);
        // Set localstorage
        localStorage.setItem("preferredTheme", theme as string);
    }, [theme]);

    return (
        <div className="join w-full">
            <button className="btn join-item">Theme</button>
            <select
                className="select select-bordered join-item w-full"
                value={theme}
                onChange={handleSelect}
            >
                <option value={THEMES.LIGHT}>Light</option>
                <option value={THEMES.DARK}>Dark</option>
                <option value={THEMES.CUPCAKE}>Cupcake</option>
                <option value={THEMES.BUMBLEBEE}>Bumblebee</option>
            </select>
        </div>
    );
};

export default ThemeController;
