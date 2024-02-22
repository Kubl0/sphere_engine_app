'use client'

import React, {ReactNode, useEffect, useState} from 'react';
import Workspace from './workspace';
import Script from "next/script";

const Page = () => {

    const [workspaceKey, setWorkspaceKey] = useState(0);
    const [workspace, setWorkspace] = useState<ReactNode>(null);

    const reloadWorkspace = () => {
        setWorkspaceKey(workspaceKey + 1);
    };

    useEffect(() => {
        window?.SE?.ready(() => {
            setWorkspace(
                <Workspace
                    key={workspaceKey}
                    workspaceId="c8336edeb9b24e7b81f0d68bb61ae054"
                ></Workspace>
            );
        });
    }, [workspaceKey]);

    return (
        <div className="flex grow flex-col items-center">
            <Script src="/se_sdk.js" strategy={"beforeInteractive"}/>
            <button
                className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-md font-medium mb-2 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2"
                onClick={reloadWorkspace}>Reload Workspace
            </button>
            <div className="w-[100%] h-[100%]">
                {workspace ? workspace : <p className="text-center mt-10">Loading...</p>}
            </div>
        </div>
    );
}


export default Page;