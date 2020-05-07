import React from 'react';
import MaxWidth from '../MaxWidth';

const Footer = (props) => {
    return (
        <div className="footer">
            <MaxWidth>
                <ul>
                    <li>copyright 2020</li>
                </ul>
            </MaxWidth>
            <style jsx>
                {`
                    .footer {
                        background: var(--gray-500);
                        color: #fff;
                    }
                `}
            </style>
        </div>
    );
};
export default Footer;
