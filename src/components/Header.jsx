import React from "react";

const Header = ({children}) => {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__email-block">{children}</div>
        </header>
    )
}

export default Header;