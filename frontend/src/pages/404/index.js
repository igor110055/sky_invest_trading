import React from "react";

//Components
import NotFound from "@components/NotFound";

const Page404 = () => {
    return (
        <div className="main">
            <div className="main__cash_content">
                <NotFound codeError="404" />
            </div>
        </div>
    );
};

export default Page404;
