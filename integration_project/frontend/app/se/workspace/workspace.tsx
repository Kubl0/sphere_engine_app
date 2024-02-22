import React, {useEffect, useState} from 'react';
import Script from "next/script";
import {element} from "prop-types";

declare global {
    interface Window {
        SE: any;
        SEC: any;
        SEP: any;
    }

}

const Workspace: React.FC<{ workspaceId: string}> = ({workspaceId}) => {

    const [workspace, setWorkspace] = useState<React.ReactNode>(null);

    useEffect(() => {
        const createWorkspace = () => {
            setWorkspace(window.SE?.workspace("seco-workspace"));
        };

        createWorkspace();

        return () => {
            if(workspace) {
                window.SE.workspace("seco-workspace").destroy();
                setWorkspace(null);
            }
        }
    }, [workspace]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id="seco-workspace" data-workspace={workspaceId}></div>
        </div>
    );
};

export default Workspace;