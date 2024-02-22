'use client'

import React, { useEffect } from 'react';
import Script from "next/script";

function Compiler() {

    useEffect(() => {
        if(window.SEC) {
            window.SEC?.ready(() => {

                const widget = window.SEC?.widget("example-widget");

                widget?.config({
                    code: {
                        compiler: 28,
                        source: "#!/bin/bash\n\necho test",
                        input: "",
                    },
                    compilers: {
                        list: [11, 21, 28, 33],
                    },
                });

                return () => {
                    window.SEC?.ready(() => {
                        widget && widget.destroy();
                    });
                };
            });
        }
    }, []);

    return (
        <div className="flex grow">
            <Script src="/se_sdk.js" strategy={"beforeInteractive"}/>
            <div className="sec-widget" data-widget="9fce8f3ed9ed00290c95888313379c89"></div>
        </div>
    );
}

export default Compiler;