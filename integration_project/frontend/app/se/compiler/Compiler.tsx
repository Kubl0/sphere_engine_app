'use client'

import React, { useEffect } from 'react';


function Compiler() {

    const [widget, setWidget] = React.useState<any>(null);

    useEffect(() => {
        window.SEC?.ready(() => {

            const widgetInstance = window.SEC?.widget("sec-widget");

            widgetInstance.config({
                code: {
                    compiler: 28,
                    source: "from sys import stdin\n" +
                        "\n" +
                        "for line in stdin:\n" +
                        "\tn = int(line)\n" +
                        "\tif n == 42:\n" +
                        "\t\tbreak\n" +
                        "\tprint(n)",
                    input: "",
                },
                compilers: {
                    list: [116, 41, 1, 35, 112]
                }
            });

            if (widgetInstance) {
                setWidget(widgetInstance);
            }
        });

        return () => {
            if (widget) {
                widget.destroy();
            }
        }
    }, [widget]);

    return (
        <div className="flex grow">
            <div data-id="sec-widget" data-widget="9fce8f3ed9ed00290c95888313379c89"></div>
        </div>
    );
}

export default Compiler;