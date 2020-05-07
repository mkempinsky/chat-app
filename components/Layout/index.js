import React from 'react';
import Nav from '../Nav';
import Footer from '../Footer';

const Layout = (props) => {
    return (
        <div className="layout" style={{...props.style}}>
            <Nav />
            <div className="layout__inner" style={{background: props.background}}>
                {props.children}
            </div>
            <Footer />
            <style jsx>
                {`
                    .layout__inner {
                        padding: 20px;
                        min-height: 100vh;
                    }
                `}
            </style>
        </div>
    );
};
export default Layout;
