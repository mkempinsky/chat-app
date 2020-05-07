import React from 'react';

const MaxWidth = (props) => {
    return (
        <div className="max-width">
            {props.children}
            <style jsx>{`
                .max-width {
                    max-width: 1170px;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};
export default MaxWidth;
