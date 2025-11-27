'use client';

'use client';

import { useEffect } from 'react';
import '../i18n/request';

export default function I18nProvider({ children }) {
    useEffect(() => {
        // i18n se inicializa en ts
    }, []);

    return <>{children}</>;
}
