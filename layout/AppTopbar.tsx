import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import Link from 'next/link';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';

type AppTopbarProps = {
    currentPath: string; // 添加 currentPath 屬性到 props 類型中
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
        <div className="layout-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" className="layout-topbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span style={{ marginLeft: '8px' }}>SAKAI</span>
            </Link>

            <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                <Link href="/uikit/checklist">
                    <span
                        className={`nav-link ${props.currentPath === '/uikit/checklist' ? 'nav-link-active' : ''}`}
                        style={{ color: layoutConfig.colorScheme !== 'light' ? 'white' : 'black', margin: '0 16px' }}
                    >
                        Check List
                    </span>
                </Link>

                <Link href="/uikit/test">
                    <span
                        className={`nav-link ${props.currentPath === '/uikit/test' ? 'nav-link-active' : ''}`}
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
