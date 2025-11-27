'use client';

'use client';

import { useEffect } from 'react';
import '../i18n/config';

export default function I18nProvider({ children }) {
    useEffect(() => {
        // i18n is initialized in config.js
    }, []);

    return <>{children}</>;
}
