import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import Link from 'next/link';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';

type AppTopbarProps = {
    currentPath: string;
};

const AppTopbar = forwardRef<AppTopbarRef, AppTopbarProps>((props, ref) => {
    const { layoutConfig } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Link href="/"  className="layout-topbar-logo" style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '2%' }}>
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span style={{ marginLeft: '5px' }}>AI Alignment System</span>
            </Link>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link href="/populace/checklist">
                    <span
                        className={`nav-link ${props.currentPath === '/populace/checklist' ? 'nav-link-active' : ''}`}
                        style={{ color: layoutConfig.colorScheme !== 'light' ? 'white' : 'black', margin: '0 16px' }}
                    >
                        Check List
                    </span>
                </Link>

                <Link href="/populace/checkPrivacyPolicy">
                    <span
                        className={`nav-link ${props.currentPath === '/populace/checkPrivacyPolicy' ? 'nav-link-active' : ''}`}
                        style={{ color: layoutConfig.colorScheme !== 'light' ? 'white' : 'black', margin: '0 16px' }}
                    >
                        Check Privacy Policy
                    </span>
                </Link>

                <Link href="/populace/test">
                    <span
                        className={`nav-link ${props.currentPath === '/populace/test' ? 'nav-link-active' : ''}`}
                        style={{ color: layoutConfig.colorScheme !== 'light' ? 'white' : 'black', margin: '0 16px' }}
                    >
                        Test
                    </span>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
